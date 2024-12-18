"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCMSProvider = void 0;
const wp_provider_1 = require("./wordpress/wp-provider");
const mongo_provider_1 = require("./mongodb/mongo-provider");
function createCMSProvider(type) {
    switch (type) {
        case 'wordpress':
            const wpApiUrl = process.env.WORDPRESS_API_URL;
            if (!wpApiUrl) {
                throw new Error('WORDPRESS_API_URL is not defined');
            }
            return new wp_provider_1.WordPressProvider(wpApiUrl);
        case 'mongodb':
            const mongoUri = process.env.MONGODB_URI;
            const dbName = process.env.MONGODB_DB_NAME;
            if (!mongoUri || !dbName) {
                throw new Error('MongoDB configuration is not complete');
            }
            return new mongo_provider_1.MongoDBProvider(mongoUri, dbName);
        default:
            throw new Error(`Unsupported CMS type: ${type}`);
    }
}
exports.createCMSProvider = createCMSProvider;
