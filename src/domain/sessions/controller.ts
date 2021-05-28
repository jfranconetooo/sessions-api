import { Context } from 'koa';
import sessionsService  from './service';

export default () => {
    const service = new sessionsService();

    const list = async (ctx: Context): Promise<void> => {
        const { professionalCode: code } = ctx.params;
        ctx.oK(await service.list(code));
    }

    const create = async (ctx: Context): Promise<void> => {
        const { body } = ctx.request;
        ctx.created(await service.create(body));
    }
    
    const remove = async (ctx: Context): Promise<void> => {
        const { professionalCode: code } = ctx.params;
        await service.delete(code)
        ctx.oK();
    }

    const schedule = async (ctx: Context): Promise<void> => {
        const { body } = ctx.request;
        const { professionalCode } = ctx.params;
        await service.schedule(professionalCode, body);
        ctx.oK();
    }

    return {
        list,
        create,
        remove,
        schedule
    }
}