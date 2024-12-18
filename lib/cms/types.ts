export interface Post {
	title: string;
	excerpt: string;
	slug: string;
	date: string;
	modified?: string;
	featuredImage?: {
		sourceUrl: string;
	};
	author?: {
		name: string;
		firstName?: string;
		lastName?: string;
		avatar?: {
			url: string;
		};
	};
	content?: string;
	categories?: Array<{ name: string }>;
	tags?: Array<{ name: string }>;
}

export interface CMSProvider {
	getPreviewPost(id: number, idType?: string): Promise<any>;
	getAllPostsWithSlug(): Promise<any>;
	getAllPostsForHome(preview: boolean, page?: number, perPage?: number): Promise<any>;
	getPostAndMorePosts(slug: string, preview: boolean, previewData?: any): Promise<any>;
	getPageBySlug(slug: string): Promise<any>;
	getAllPages(): Promise<any>;
} 