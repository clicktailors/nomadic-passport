import { CMSProvider } from '../types';
import { fetchAPI } from './wp-api';

export class WordPressProvider implements CMSProvider {
	constructor(private apiUrl: string) {}

	private async fetch(query: string, { variables }: Record<string, any> = {}) {
		return fetchAPI(query, { variables }, this.apiUrl);
	}

	async getPreviewPost(id: number, idType = "DATABASE_ID") {
		const data = await this.fetch(
			`
				query PreviewPost($id: ID!, $idType: PostIdType!) {
					post(id: $id, idType: $idType) {
						databaseId
						slug
						status
					}
				}`,
			{ variables: { id, idType } }
		);
		return data.post;
	}

	async getAllPostsWithSlug() {
		const data = await this.fetch(
			`
			{
				posts(first: 10000) {
					edges {
						node {
							title
							excerpt
							slug
							date
							modified
							featuredImage {
								node {
									sourceUrl
								}
							}
							author {
								node {
									name
									firstName
									lastName
									avatar {
										url
									}
								}
							}
						}
					}
				}
			}
			`
		);
		return data?.posts;
	}

	async getAllPostsForHome(preview: boolean, page = 1, perPage = 20) {
		const data = await this.fetch(
			`
			query AllPosts($first: Int!, $after: String) {
				posts(
					first: $first,
					after: $after,
					where: { orderby: { field: DATE, order: DESC } }
				) {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node {
							title
							excerpt
							slug
							date
							featuredImage {
								node {
									sourceUrl
								}
							}
							author {
								node {
									name
									firstName
									lastName
									avatar {
										url
									}
								}
							}
						}
					}
				}
			}`,
			{
				variables: {
					first: perPage,
					after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
				},
			}
		);

		return {
			edges: data?.posts?.edges || [],
			pageInfo: data?.posts?.pageInfo || {
				hasNextPage: false,
				endCursor: null
			}
		};
	}

	async getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
		const postPreview = preview && previewData?.post;
		const isId = Number.isInteger(Number(slug));
		const isSamePost = isId
			? Number(slug) === postPreview?.id
			: slug === postPreview?.slug;
		const isDraft = isSamePost && postPreview?.status === "draft";
		const isRevision = isSamePost && postPreview?.status === "publish";
		
		const variables = {
			id: isDraft ? postPreview.id : slug,
			idType: isDraft ? 'DATABASE_ID' : 'SLUG'
		};

		const data = await this.fetch(
			`
			fragment AuthorFields on User {
				name
				firstName
				lastName
				avatar {
					url
				}
			}
			
			fragment PostFields on Post {
				title
				excerpt
				slug
				date
				featuredImage {
					node {
						sourceUrl
					}
				}
				author {
					node {
						...AuthorFields
					}
				}
				categories {
					edges {
						node {
							name
						}
					}
				}
				tags {
					edges {
						node {
							name
						}
					}
				}
			}
			query PostBySlug($id: ID!, $idType: PostIdType!) {
				post(id: $id, idType: $idType) {
					...PostFields
					content
					${
						isRevision
							? `
					revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
						edges {
							node {
								title
								excerpt
								content
								author {
									node {
										...AuthorFields
									}
								}
							}
						}
					}
					`
							: ""
					}
				}
				posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
					edges {
						node {
							...PostFields
						}
					}
				}
			}
			`,
			{ variables }
		);

		if (isDraft) data.post.slug = postPreview.id;
		if (isRevision && data.post.revisions) {
			const revision = data.post.revisions.edges[0]?.node;
			if (revision) Object.assign(data.post, revision);
			delete data.post.revisions;
		}

		return data;
	}

	async getPageBySlug(slug: string) {
		const data = await this.fetch(
			`
			query PageBySlug($id: ID!) {
				page(id: $id, idType: URI) {
					title
					content
					slug
					modified
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
			}`,
			{ variables: { id: slug } }
		);
		return data?.page;
	}

	async getAllPages() {
		const data = await this.fetch(
			`
			{
				pages(first: 100) {
					edges {
						node {
							title
							slug
							content
						}
					}
				}
			}
			`
		);
		return data?.pages;
	}
} 