import middlewares from "@shared/middlewares";
import { catchAsync} from "@shared/utils";
import { Router} from "express";
import {checkOutBoundSMS} from "@controllers/outbound";




// Export the base-router
const outBoundRouter = Router({mergeParams:true});

const wrapper = function(){
    // Setup routers
    outBoundRouter.post('/sms/:from/:to',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        catchAsync(middlewares.limitRequestBasedOnFromParam),
        catchAsync(checkOutBoundSMS));
    return outBoundRouter
}
// Export default.
export default wrapper;