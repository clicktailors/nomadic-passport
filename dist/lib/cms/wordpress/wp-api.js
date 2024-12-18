"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAPI = void 0;
const axios_1 = __importDefault(require("axios"));
async function fetchAPI(query = "", { variables } = {}, apiUrl, authToken) {
    var _a, _b;
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }
    const maxRetries = 5;
    let lastError;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const { data } = await axios_1.default.post(apiUrl, {
                query,
                variables,
            }, {
                headers,
                timeout: 30000,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });
            if (data.errors) {
                console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
                throw new Error(((_a = data.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || "Failed to fetch API");
            }
            return data.data;
        }
        catch (error) {
            lastError = error;
            console.error(`API Error (attempt ${attempt + 1}/${maxRetries}):`, {
                message: error.message,
                status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
                query: query.slice(0, 200) + '...',
                variables
            });
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
            continue;
        }
    }
    throw new Error(`Failed to fetch API after ${maxRetries} attempts: ${lastError.message}`);
}
exports.fetchAPI = fetchAPI;
