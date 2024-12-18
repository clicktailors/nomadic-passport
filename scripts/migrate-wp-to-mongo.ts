declare module 'mongodb';
declare module '../lib/cms/cms-factory';
declare module '../lib/logging';

import { MongoClient } from 'mongodb';
import { createCMSProvider } from '../lib/cms/cms-factory';
import dotenv from 'dotenv';
import path from 'path';

interface WPNode {
	title: string;
	slug: string;
	date: string;
	modified?: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
		};
	};
	content?: string;
	excerpt?: string;
	author?: {
		node: {
			name: string;
			firstName?: string;
			lastName?: string;
			avatar?: {
				url: string;
			};
		};
	};
}

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function migrateContent() {
	try {
		// Get WordPress content
		const wpProvider = createCMSProvider('wordpress');
		console.log('Fetching WordPress content...');
		const posts = await wpProvider.getAllPostsWithSlug();
		const pages = await wpProvider.getAllPages();

		// Connect to MongoDB
		const mongoUri = process.env.MONGODB_URI;
		const dbName = process.env.MONGODB_DB_NAME;
		
		if (!mongoUri || !dbName) {
			throw new Error('MongoDB configuration is not complete');
		}

		console.log('Connecting to MongoDB...');
		const client = new MongoClient(mongoUri);
		await client.connect();
		const db = client.db(dbName);

		// Migrate posts
		console.log('Migrating posts...');
		const postsCollection = db.collection('posts');
		await postsCollection.deleteMany({});
		await postsCollection.insertMany(
			posts.edges.map(({ node }: { node: WPNode }) => ({
				...node,
				featuredImage: node.featuredImage?.node.sourceUrl || null,
				date: new Date(node.date),
				modified: node.modified ? new Date(node.modified) : null,
			}))
		);

		// Migrate pages
		console.log('Migrating pages...');
		const pagesCollection = db.collection('pages');
		await pagesCollection.deleteMany({});
		await pagesCollection.insertMany(
			pages.edges.map(({ node }: { node: WPNode }) => ({
				...node,
				featuredImage: node.featuredImage?.node.sourceUrl || null,
				modified: node.modified ? new Date(node.modified) : null,
			}))
		);

		await client.close();
		console.log('Migration complete!');
	} catch (error) {
		console.error('Migration failed:', error);
		process.exit(1);
	}
}

migrateContent(); 