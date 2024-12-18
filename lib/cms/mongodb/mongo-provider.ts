import { CMSProvider } from '../types';
import { MongoClient } from 'mongodb';
import type { Document, WithId } from 'mongodb';

interface MongoPost extends Document {
	title: string;
	slug: string;
	date: Date;
	modified?: Date;
	featuredImage?: string;
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

interface MongoPage extends Document {
	title: string;
	slug: string;
	content: string;
	modified?: Date;
	featuredImage?: string;
}

export class MongoDBProvider implements CMSProvider {
	private client: InstanceType<typeof MongoClient>;
	private dbName: string;

	constructor(private uri: string, dbName: string) {
		this.client = new MongoClient(uri);
		this.dbName = dbName;
	}

	private async connect() {
		if (!this.client.connect) {
			await this.client.connect();
		}
		const db = this.client.db(this.dbName);
		return {
			posts: db.collection('posts'),
			pages: db.collection('pages')
		};
	}

	async getPreviewPost(id: number, idType = "DATABASE_ID") {
		const { posts } = await this.connect();
		const post = await posts.findOne({ 
			[idType === "DATABASE_ID" ? "_id" : "slug"]: id 
		});
		return post;
	}

	async getAllPostsWithSlug() {
		const { posts } = await this.connect();
		const allPosts = await posts
			.find({})
			.sort({ date: -1 })
			.toArray() as WithId<MongoPost>[];

		return {
			edges: allPosts.map(post => ({
				node: {
					...post,
					featuredImage: post.featuredImage ? {
						node: { sourceUrl: post.featuredImage }
					} : null
				}
			}))
		};
	}

	async getAllPostsForHome(preview: boolean, page = 1, perPage = 20) {
		const { posts: postsCollection } = await this.connect();
		const skip = (page - 1) * perPage;

		const [postsData, totalCount] = await Promise.all([
			postsCollection
				.find({})
				.sort({ date: -1 })
				.skip(skip)
				.limit(perPage)
				.toArray() as Promise<WithId<MongoPost>[]>,
			postsCollection.countDocuments()
		]);

		return {
			edges: postsData.map(post => ({
				node: {
					...post,
					featuredImage: post.featuredImage ? {
						node: { sourceUrl: post.featuredImage }
					} : null
				}
			})),
			pageInfo: {
				hasNextPage: skip + perPage < totalCount,
				endCursor: postsData.length > 0 ? postsData[postsData.length - 1]._id.toString() : null
			}
		};
	}

	async getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
		const { posts } = await this.connect();
		const post = await posts.findOne({ slug }) as WithId<MongoPost>;

		const morePosts = await posts
			.find({ slug: { $ne: slug } })
			.sort({ date: -1 })
			.limit(3)
			.toArray() as WithId<MongoPost>[];

		return {
			post: {
				...post,
				featuredImage: post?.featuredImage ? {
					node: { sourceUrl: post.featuredImage }
				} : null
			},
			posts: {
				edges: morePosts.map(post => ({
					node: {
						...post,
						featuredImage: post.featuredImage ? {
							node: { sourceUrl: post.featuredImage }
						} : null
					}
				}))
			}
		};
	}

	async getAllPages() {
		const { pages } = await this.connect();
		const allPages = await pages
			.find({})
			.toArray() as WithId<MongoPage>[];

		return {
			edges: allPages.map(page => ({
				node: page
			}))
		};
	}

	async getPageBySlug(slug: string): Promise<any> {
		const { pages } = await this.connect();
		const page = await pages.findOne({ slug });
		
		if (!page) {
			return null;
		}

		return {
			...page,
			featuredImage: page.featuredImage ? {
				node: { sourceUrl: page.featuredImage }
			} : null
		};
	}
} 