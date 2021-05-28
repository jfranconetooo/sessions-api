import mongoose from 'mongoose';
import config from '../configs';
mongoose.set('useFindAndModify', false);

const {
    uri: MONGO_URI
} = config.database;


export default (()=> {
    return mongoose.connect(MONGO_URI as string, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
})()

mongoose.connection.on('connected', () => {
    console.info(`Mongoose connection open to ${MONGO_URI}`);
  });
  
mongoose.connection.on('error', (error) => {
    console.error(`Mongoose connection error: ${error}`);
    throw new Error(error);
});

mongoose.connection.on('disconnected', () => {
    console.info('Mongoose connection disconnected');
});
