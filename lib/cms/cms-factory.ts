import { CMSProvider } from './types';
import { WordPressProvider } from './wordpress/wp-provider';
import { MongoDBProvider } from './mongodb/mongo-provider';

export type CMSType = 'wordpress' | 'mongodb';

export function createCMSProvider(type: CMSType): CMSProvider {
	switch (type) {
		case 'wordpress':
			const wpApiUrl = process.env.WORDPRESS_API_URL;
			
			if (!wpApiUrl) {
				throw new Error('WORDPRESS_API_URL is not defined');
			}
			
			return new WordPressProvider(wpApiUrl);
			
		case 'mongodb':
			const mongoUri = process.env.MONGODB_URI;
			const dbName = process.env.MONGODB_DB_NAME;
			
			if (!mongoUri || !dbName) {
				throw new Error('MongoDB configuration is not complete');
			}
			
			return new MongoDBProvider(mongoUri, dbName);
			
		default:
			throw new Error(`Unsupported CMS type: ${type}`);
	}
} 