import { Router } from "express";
import {health} from "../controller/health.controller"
 const healthRouter = Router() ;

 healthRouter.get('/health',health) ;

 export default healthRouter ;