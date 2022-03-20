import { catchAsync} from "@shared/utils";
import { Router} from "express";
import {checkInBoundSMS} from "@controllers/inbond";
import middlewares from "@shared/middlewares";

// Export the base-router
const inboundRouter = Router({mergeParams:true});

const wrapper =  function(){
    // Setup routers
    inboundRouter.post('/sms/:from',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        catchAsync(middlewares.limitRequestBasedOnFromParam),
        catchAsync(checkInBoundSMS)
    );
    return inboundRouter
}

// Export default.
export default wrapper;
