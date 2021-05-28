import dotenv from 'dotenv';
dotenv.config();

export default {
    node_env: process.env.NODE_ENV,
    api: {
        env: process.env.NODE_ENV,
        port: process.env.PORT || process.env.API_PORT,
        host: process.env.API_HOST
    },
    database: {
        uri: process.env.MONGO_URI
    }
}