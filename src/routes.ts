import Router from "koa-router";
import { Context, DefaultState } from 'koa';
import config from './configs';

const { node_env: NODE_ENV } = config;

export default (router: Router<DefaultState, Context>, prefix?: string): void => {
    
    const defaultRouter = new Router<DefaultState, Context>({ prefix });

    defaultRouter.get(`/`, (ctx: Context) => ctx.oK(`Session's ${NODE_ENV} server is running!`));
    defaultRouter.get(`/health`,  (ctx: Context) => ctx.oK({ health:true }));

    router.use(defaultRouter.routes());
}