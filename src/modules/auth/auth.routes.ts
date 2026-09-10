import { Router } from "express";
import loginValidator from "./validators/auth.validation";
import { handle_Validation_Errors } from "../../middleware/handle-validation-errors.middleware";
import { userLogin } from "./auth.controller";
import { refresh } from "./auth.controller";
const authRouter = Router() ;

authRouter.post('/login', loginValidator , handle_Validation_Errors ,userLogin)
authRouter.post('/refresh' ,refresh)

export default authRouter ;