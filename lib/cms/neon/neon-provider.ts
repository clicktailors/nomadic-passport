import { neon } from "@neondatabase/serverless";
import { CMSProvider } from '../types';

export class NeonCms implements CMSProvider {
	private sql;

	constructor(neonUrl: string) {
		this.sql = neon(neonUrl);
	}

	async getPreviewPost(id: number, idType?: string): Promise<any> {
		const [post] = await this.sql`
			SELECT * FROM posts 
			WHERE ${idType === 'slug' ? 'slug' : 'id'} = ${id}
		`;
		return post;
	}

	async getAllPostsWithSlug(): Promise<any[]> {
		return await this.sql`
			SELECT slug FROM posts
		`;
	}

	async getAllPostsForHome(preview: boolean): Promise<any[]> {
		const posts = await this.sql`
			SELECT 
				id,
				title,
				slug,
				excerpt,
				content,
				featured_image,
				author,
				date::text as date,
				status
			FROM posts
			ORDER BY date DESC
		`;
		return posts;
	}

	async getPostAndMorePosts(slug: string, preview: boolean): Promise<{ post: any; morePosts: any[] }> {
		const [post] = await this.sql`
			SELECT 
				id,
				title,
				slug,
				excerpt,
				content,
				featured_image,
				author,
				date::text as date,
				status
			FROM posts 
			WHERE slug = ${slug}
		`;
		
		const morePosts = await this.sql`
			SELECT 
				id,
				title,
				slug,
				excerpt,
				content,
				featured_image,
				author,
				date::text as date,
				status
			FROM posts 
			WHERE slug != ${slug}
			ORDER BY date DESC 
			LIMIT 2
		`;

		return { post, morePosts };
	}

	async getPageBySlug(slug: string): Promise<any> {
		const [page] = await this.sql`
			SELECT * FROM pages WHERE slug = ${slug}
		`;
		return page;
	}

	async getAllPages(): Promise<any[]> {
		return await this.sql`
			SELECT * FROM pages
			ORDER BY title ASC
		`;
	}

	async getAll<T>(table: string): Promise<T[]> {
		const results = await this.sql`
			SELECT * FROM ${table}
		`;
		return results as T[];
	}

	async getById<T>(table: string, id: number): Promise<T | null> {
		const [result] = await this.sql`
			SELECT * FROM ${table}
			WHERE id = ${id}
		`;
		return result as T || null;
	}

	async create<T>(table: string, data: Partial<T>): Promise<T> {
		const columns = Object.keys(data);
		const values = Object.values(data);
		
		const query = `
			INSERT INTO ${table} (${columns.join(', ')})
			VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})
			RETURNING *
		`;
		
		const [result] = await this.sql(query, values);
		return result as T;
	}

	async update<T>(table: string, id: number, data: Partial<T>): Promise<T> {
		const setClause = Object.keys(data)
			.map((key, i) => `${key} = $${i + 2}`)
			.join(', ');

		const query = `
			UPDATE ${table}
			SET ${setClause}
			WHERE id = $1
			RETURNING *
		`;
		
		const values = [id, ...Object.values(data)];
		const [result] = await this.sql(query, values);
		return result as T;
	}

	async delete(table: string, id: number): Promise<void> {
		await this.sql`
				DELETE FROM ${table}
				WHERE id = ${id}
			`;
	}
} 