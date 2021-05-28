import Koa, { DefaultState, Context } from 'koa';
import KoaRouter  from 'koa-router';
import cors from '@koa/cors';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import routes from './routes';
import { sessionsRoutes } from './domain/sessions';
import koaResponse from 'koa-response2';
import { error } from './middlewares';
import { oas } from 'koa-oas3';

const init = async () => {
    const app = new Koa();
    const router = new KoaRouter<DefaultState, Context>();
    app.use(cors());
    app.use(logger());
    app.use(koaResponse());
    app.use(json());
    app.use(bodyParser());
    const oasMw = await oas({
        file: `${__dirname}/openapi.yaml`,
        endpoint: '/openapi.json',
        uiEndpoint: '/docs'
      })
    app.use(oasMw);
    app.use(error())
    routes(router);
    sessionsRoutes(router, '/sessions');
    app.use(router.routes());
    return app;
}
export default init