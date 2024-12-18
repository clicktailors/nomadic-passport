import { CMSProvider } from './types';
import { WordPressProvider } from './wordpress/wp-provider';
import { NeonCms } from "./neon/neon-provider";

export type CMSType = 'wordpress' | 'neon';

export function createCMSProvider(type: CMSType): CMSProvider {
	switch (type) {
		case 'wordpress':
			const wpApiUrl = process.env.WORDPRESS_API_URL;
			
			if (!wpApiUrl) {
				throw new Error('WORDPRESS_API_URL is not defined');
			}
			
			return new WordPressProvider(wpApiUrl);
			
		case 'neon':
			const neonUrl = process.env.NEON_URL;
			
			if (!neonUrl) {
				throw new Error('NEON_URL is not defined');
			}
			
			return new NeonCms(neonUrl);
			
		default:
			throw new Error(`Unsupported CMS type: ${type}`);
	}
} 