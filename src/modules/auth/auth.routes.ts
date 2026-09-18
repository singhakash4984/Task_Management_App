import { Router } from "express";
import { validate } from "../../middleware/handle-validation-errors.middleware";
import { registerSchema } from "./auth.schema";
import { registerController } from "./auth.controller";

const authRouter = Router() ;

// unauthenticated routes 

authRouter.post('/register',validate(registerSchema),registerController)

export default authRouter ;

