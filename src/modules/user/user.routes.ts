import { Router } from "express";
import userValidator from "./validators/user.validator";
import { handle_Validation_Errors } from "../../middleware/handle-validation-errors.middleware";
import { register } from "./user.controller";

const userRouter = Router() ;

userRouter.post('/register',userValidator,handle_Validation_Errors,register) ;

export default userRouter ;