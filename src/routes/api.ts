import { Router } from "express";
import middlewares from "@shared/middlewares";
import inBound from "./inbound";
import  outBound from "./outbound";
import { catchAsync } from "@shared/utils";



const baseRouter:Router =  Router({
    mergeParams:true
});


/**
 * Spins up a global handler to use for the application with endpoint `/`
 * @param _opts additional properties to be used in the route
 * @returns `Router` instance of Router
 */
function CreateGlobalRouter(_opts?:{[key:string|number]:any})  {
    baseRouter.use(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        middlewares.restrictNonPostRequest,
        catchAsync(middlewares.authorize));
    baseRouter.use('/inbound',inBound());
    baseRouter.use('/outbound',outBound());

    return baseRouter;
}

export default CreateGlobalRouter;

