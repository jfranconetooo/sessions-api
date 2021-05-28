import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer, mongoUri: string;
export default (async ()=> {
    mongoServer = new MongoMemoryServer();
    mongoUri = await mongoServer.getUri();
    return mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true 
    });
})()

mongoose.connection.on('connected', () => {
    console.info(`Mongoose connection open to ${mongoUri}`);
  });
  
mongoose.connection.on('error', (error) => {
    console.error(`Mongoose connection error: ${error}`);
    throw new Error(error);
});

mongoose.connection.once('disconnected', async () => {
    console.info('Mongoose disconnected');
    await mongoServer.stop();
});
