"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPressProvider = void 0;
const wp_api_1 = require("./wp-api");
class WordPressProvider {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    async fetch(query, { variables } = {}) {
        return (0, wp_api_1.fetchAPI)(query, { variables }, this.apiUrl);
    }
    async getPreviewPost(id, idType = "DATABASE_ID") {
        const data = await this.fetch(`
				query PreviewPost($id: ID!, $idType: PostIdType!) {
					post(id: $id, idType: $idType) {
						databaseId
						slug
						status
					}
				}`, { variables: { id, idType } });
        return data.post;
    }
    async getAllPostsWithSlug() {
        const data = await this.fetch(`
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
			`);
        return data === null || data === void 0 ? void 0 : data.posts;
    }
    async getAllPostsForHome(preview, page = 1, perPage = 20) {
        var _a, _b;
        const data = await this.fetch(`
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
			}`, {
            variables: {
                first: perPage,
                after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
            },
        });
        return {
            edges: ((_a = data === null || data === void 0 ? void 0 : data.posts) === null || _a === void 0 ? void 0 : _a.edges) || [],
            pageInfo: ((_b = data === null || data === void 0 ? void 0 : data.posts) === null || _b === void 0 ? void 0 : _b.pageInfo) || {
                hasNextPage: false,
                endCursor: null
            }
        };
    }
    async getPostAndMorePosts(slug, preview, previewData) {
        var _a;
        const postPreview = preview && (previewData === null || previewData === void 0 ? void 0 : previewData.post);
        const isId = Number.isInteger(Number(slug));
        const isSamePost = isId
            ? Number(slug) === (postPreview === null || postPreview === void 0 ? void 0 : postPreview.id)
            : slug === (postPreview === null || postPreview === void 0 ? void 0 : postPreview.slug);
        const isDraft = isSamePost && (postPreview === null || postPreview === void 0 ? void 0 : postPreview.status) === "draft";
        const isRevision = isSamePost && (postPreview === null || postPreview === void 0 ? void 0 : postPreview.status) === "publish";
        const variables = {
            id: isDraft ? postPreview.id : slug,
            idType: isDraft ? 'DATABASE_ID' : 'SLUG'
        };
        const data = await this.fetch(`
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
					${isRevision
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
            : ""}
				}
				posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
					edges {
						node {
							...PostFields
						}
					}
				}
			}
			`, { variables });
        if (isDraft)
            data.post.slug = postPreview.id;
        if (isRevision && data.post.revisions) {
            const revision = (_a = data.post.revisions.edges[0]) === null || _a === void 0 ? void 0 : _a.node;
            if (revision)
                Object.assign(data.post, revision);
            delete data.post.revisions;
        }
        return data;
    }
    async getPageBySlug(slug) {
        const data = await this.fetch(`
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
			}`, { variables: { id: slug } });
        return data === null || data === void 0 ? void 0 : data.page;
    }
    async getAllPages() {
        const data = await this.fetch(`
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
			`);
        return data === null || data === void 0 ? void 0 : data.pages;
    }
}
exports.WordPressProvider = WordPressProvider;
