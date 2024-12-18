import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

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
    theme?: {
        primaryColor: string;
        secondaryColor: string;
    };
}

const siteConfigs: SiteConfig[] = [
    // ClickTailors configuration
    {
        siteId: 'clicktailors',
        domain: 'clicktailors.com',
        siteName: 'ClickTailors',
        siteDescription: 'ClickTailors is a digital marketing agency that specializes in creating custom websites and digital marketing strategies for businesses.',
        cmsType: 'wordpress',
        wordpress: {
            apiUrl: 'https://wp.clicktailors.com/graphql'
        }
    },
    // Example second site configuration
    {
        siteId: 'site2',
        domain: 'example.com',
        siteName: 'Site 2',
        siteDescription: 'Description for Site 2',
        cmsType: 'mongodb',
        mongodb: {
            uri: process.env.MONGODB_URI || '',
            dbName: 'site2-db'
        }
    }
];

async function initializeSiteConfigs() {
    if (!process.env.MONGODB_CONFIG_URI) {
        throw new Error('MONGODB_CONFIG_URI environment variable is required');
    }

    const client = new MongoClient(process.env.MONGODB_CONFIG_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('site-configs');
        const sitesCollection = db.collection('sites');

        // Create unique index on siteId and domain
        await sitesCollection.createIndex({ siteId: 1 }, { unique: true });
        await sitesCollection.createIndex({ domain: 1 }, { unique: true });

        // Insert or update site configurations
        for (const config of siteConfigs) {
            await sitesCollection.updateOne(
                { siteId: config.siteId },
                { $set: config },
                { upsert: true }
            );
            console.log(`Configured site: ${config.siteId}`);
        }

        console.log('Site configurations initialized successfully');
    } catch (error) {
        console.error('Error initializing site configurations:', error);
        throw error;
    } finally {
        await client.close();
    }
}

initializeSiteConfigs().catch(console.error); 