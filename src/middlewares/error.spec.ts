import { createMockContext } from '@shopify/jest-koa-mocks';
import { error } from './index';
import { Context } from 'koa';

describe('Error middleware', () => {
    
    it("A success request", async () => {
        const ctx: Context = createMockContext();
        const next = jest.fn();

        await error()(ctx, next);
        expect(next).toBeCalledTimes(1);
    });


    it("Handle request error with resposte with status 400 and message", async () => {
        const ctx: Context = createMockContext();
         const next = jest.fn().mockRejectedValueOnce({
            message: "Invalid request", 
            status: 400
         });
 
         await error()(ctx, next);
         expect(ctx.throw).toBeCalledWith(400, "Invalid request");
    });
})