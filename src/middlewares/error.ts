import { Context, Next } from 'koa';

export default () => async (ctx: Context, next: Next): Promise<void> => {
    try {
        await next();
    } catch (error) {
        if(error) {
            ctx.throw(error.status, error.message);
        } else ctx.throw(error);
      }  
}