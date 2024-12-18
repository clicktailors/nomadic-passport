import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';

interface SiteConfig {
    siteId: string;
    domain: string;
    siteName: string;
    siteDescription: string;
    cmsType: 'wordpress' | 'mongodb';
    wordpress?: {
        apiUrl: string;
    };
    mongodb?: {
        uri: string;
        dbName: string;
    };
}

export async function middleware(request: NextRequest) {
    try {
        const hostname = request.headers.get('host') || '';
        const domain = hostname.replace(/^www\./, '');

        // Connect to MongoDB and get site configuration
        const mongoUri = process.env.MONGODB_CONFIG_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_CONFIG_URI environment variable is required');
        }

        const client = new MongoClient(mongoUri);

        try {
            await client.connect();
            const db = client.db('site-configs');
            const sitesCollection = db.collection<SiteConfig>('sites');

            const siteConfig = await sitesCollection.findOne({ domain });
            
            if (!siteConfig) {
                console.error(`No configuration found for domain: ${domain}`);
                return NextResponse.next();
            }

            // Clone the request headers
            const requestHeaders = new Headers(request.headers);
            
            // Add site configuration to request headers
            requestHeaders.set('x-site-id', siteConfig.siteId);
            requestHeaders.set('x-site-name', siteConfig.siteName);
            requestHeaders.set('x-site-cms-type', siteConfig.cmsType);
            
            // Add CMS-specific configuration
            if (siteConfig.cmsType === 'wordpress' && siteConfig.wordpress?.apiUrl) {
                requestHeaders.set('x-wordpress-api-url', siteConfig.wordpress.apiUrl);
            } else if (siteConfig.cmsType === 'mongodb' && siteConfig.mongodb) {
                requestHeaders.set('x-mongodb-uri', siteConfig.mongodb.uri);
                requestHeaders.set('x-mongodb-db-name', siteConfig.mongodb.dbName);
            }

            // Return response with modified headers
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 