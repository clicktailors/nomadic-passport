"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBProvider = void 0;
const mongodb_1 = require("mongodb");
class MongoDBProvider {
    constructor(uri, dbName) {
        this.uri = uri;
        this.client = new mongodb_1.MongoClient(uri);
        this.dbName = dbName;
    }
    async connect() {
        if (!this.client.connect) {
            await this.client.connect();
        }
        return this.client.db(this.dbName);
    }
    async getPreviewPost(id, idType = "DATABASE_ID") {
        const db = await this.connect();
        const post = await db.collection('posts').findOne({
            [idType === "DATABASE_ID" ? "_id" : "slug"]: id
        });
        return post;
    }
    async getAllPostsWithSlug() {
        const db = await this.connect();
        const posts = await db.collection('posts')
            .find({})
            .sort({ date: -1 })
            .toArray();
        return {
            edges: posts.map((post) => ({
                node: {
                    ...post,
                    featuredImage: post.featuredImage ? {
                        node: { sourceUrl: post.featuredImage }
                    } : null
                }
            }))
        };
    }
    async getAllPostsForHome(preview, page = 1, perPage = 20) {
        const db = await this.connect();
        const skip = (page - 1) * perPage;
        const [posts, totalCount] = await Promise.all([
            db.collection('posts')
                .find({})
                .sort({ date: -1 })
                .skip(skip)
                .limit(perPage)
                .toArray(),
            db.collection('posts').countDocuments()
        ]);
        return {
            edges: posts.map((post) => ({
                node: {
                    ...post,
                    featuredImage: post.featuredImage ? {
                        node: { sourceUrl: post.featuredImage }
                    } : null
                }
            })),
            pageInfo: {
                hasNextPage: skip + perPage < totalCount,
                endCursor: posts.length > 0 ? posts[posts.length - 1]._id.toString() : null
            }
        };
    }
    async getPostAndMorePosts(slug, preview, previewData) {
        const db = await this.connect();
        const post = await db.collection('posts').findOne({ slug });
        const morePosts = await db.collection('posts')
            .find({ slug: { $ne: slug } })
            .sort({ date: -1 })
            .limit(3)
            .toArray();
        return {
            post: {
                ...post,
                featuredImage: (post === null || post === void 0 ? void 0 : post.featuredImage) ? {
                    node: { sourceUrl: post.featuredImage }
                } : null
            },
            posts: {
                edges: morePosts.map((post) => ({
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
        const db = await this.connect();
        const pages = await db.collection('pages')
            .find({})
            .toArray();
        return {
            edges: pages.map((page) => ({
                node: page
            }))
        };
    }
    async getPageBySlug(slug) {
        const db = await this.connect();
        const page = await db.collection('pages').findOne({ slug });
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
exports.MongoDBProvider = MongoDBProvider;
