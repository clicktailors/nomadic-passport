import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface SiteConfig {
	siteId: string;
	domain: string;
	siteName: string;
	siteDescription: string;
	cmsType: 'wordpress' | 'neon';
	wordpress?: {
		apiUrl: string;
	};
}

export async function middleware(request: NextRequest) {
	try {
		const hostname = request.headers.get('host') || '';
		const domain = hostname.replace(/^www\./, '');

		// Connect to Neon and get site configuration
		const neonUrl = process.env.NEON_URL;
		if (!neonUrl) {
			throw new Error('NEON_URL environment variable is required');
		}

		const sql = neon(neonUrl);
		
		// Query site configuration from Neon
		const [siteConfig] = await sql`
			SELECT * FROM site_configs 
			WHERE domain = ${domain}
		` as SiteConfig[];

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
		}

		// Return response with modified headers
		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
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