"use strict";
const { MongoClient } = require('mongodb');
const { createCMSProvider } = require('../lib/cms/cms-factory');
const dotenv = require('dotenv');
const path = require('path');
const { LOGGING } = require('../lib/logging');
// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
async function migrateContent() {
    // Get WordPress content
    const wpProvider = createCMSProvider('wordpress');
    const posts = await wpProvider.getAllPostsWithSlug();
    const pages = await wpProvider.getAllPages();
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;
    if (!mongoUri || !dbName) {
        throw new Error('MongoDB configuration is not complete');
    }
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    // Migrate posts
    const postsCollection = db.collection('posts');
    await postsCollection.deleteMany({});
    await postsCollection.insertMany(posts.edges.map(({ node }) => {
        var _a;
        return ({
            ...node,
            featuredImage: ((_a = node.featuredImage) === null || _a === void 0 ? void 0 : _a.node.sourceUrl) || null,
            date: new Date(node.date),
            modified: node.modified ? new Date(node.modified) : null,
        });
    }));
    // Migrate pages
    const pagesCollection = db.collection('pages');
    await pagesCollection.deleteMany({});
    await pagesCollection.insertMany(pages.edges.map(({ node }) => {
        var _a;
        return ({
            ...node,
            featuredImage: ((_a = node.featuredImage) === null || _a === void 0 ? void 0 : _a.node.sourceUrl) || null,
            modified: node.modified ? new Date(node.modified) : null,
        });
    }));
    await client.close();
    LOGGING && console.log('Migration complete!');
}
migrateContent().catch(console.error);
