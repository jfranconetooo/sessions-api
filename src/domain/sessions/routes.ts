import Router from "koa-router";
import { Context, DefaultState } from 'koa';
import  sessionsCtrlFactory from './controller';
import { sessionsRoutes } from ".";

const sessionsCtrl = sessionsCtrlFactory();

export default (router: Router<DefaultState, Context>, prefix = '/sessions'): void => {
    const sessionsRouter = new Router<DefaultState, Context>({ prefix });
    sessionsRouter.post(`/`,  sessionsCtrl.create);
    sessionsRouter.get(`/`, sessionsCtrl.list);
    sessionsRouter.get(`/:professionalCode`, sessionsCtrl.list);
    sessionsRouter.patch('/:professionalCode', sessionsCtrl.update);
    sessionsRouter.delete(`/:professionalCode`, sessionsCtrl.remove);
    sessionsRouter.post(`/schedule/:professionalCode`, sessionsCtrl.schedule);
    router.use(sessionsRouter.routes());
}