import { Context } from 'koa';
import init from './app';
import config from './configs';
import('./configs/database');

const {
    port: PORT,
    env: NODE_ENV
} = config.api;

init().then(app => {
    app.listen(PORT, () => {
        console.log(`Server listing on ${PORT} in ${NODE_ENV} environment!`);
    });

    //* centralized error handling:

    app.on('error', (err, ctx: Context) => {
        console.error(err);
        return ctx;
    });

    process.on('unhandledRejection', error => {
        // Will print "unhandledRejection err is not defined"
        console.log('unhandledRejection', error);
    });
})
