import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import SessionsCtrlFactory from './controller';

jest.mock('./service');

describe('Sessions controller', () => {
    let ctx: Context;
    let sessionsCtrl: any;

    beforeAll(()=>{
        sessionsCtrl = SessionsCtrlFactory();
    });

    beforeEach(() => {
        ctx = createMockContext({
            customProperties: {
                params: {
                    professionalCode: undefined
                },
                request: {
                    body: {
                        professional: "Vinicius",
                        availability: [
                          {      
                            date: "Mondayc, May 31, 2021",
                            interval_hours: [
                              {
                                startTime: "13:00",
                                endTime: "16:00"
                              },
                              {
                                startTime: "17:00",
                                endTime: "19:00"
                              }
                            ]
                          }
                        ]
                    }
                }, 
                oK: jest.fn().mockImplementationOnce((payload?: any) => {
                    if(payload.length !== 0) {
                        ctx.status = 200;
                        ctx.body = payload;
                    } else ctx.status = 404;
                }),
                created: jest.fn().mockImplementationOnce((payload?: any) => {
                    if(payload) {
                        ctx.status = 201;
                        ctx.body = payload;
                    } else ctx.status = 204;
                })
            }
        });
    });

    it('Should return a success request with []', async ()=> {
        await sessionsCtrl.list(ctx);
        expect(ctx.status).toBe(200);
        expect(ctx.body).toBeInstanceOf(Array)
    });

    it('Should return a success request with session created', async ()=> {
        await sessionsCtrl.create(ctx);
        expect(ctx.status).toBe(201);
        expect(ctx.body).toHaveProperty('professional');
        expect(ctx.body).toHaveProperty('availability');
    });

    it('Should return not found in list', async ()=> {
        ctx.params.professionalCode = '1';
        await sessionsCtrl.list(ctx);
        expect(ctx.status).toBe(404);
    });
});