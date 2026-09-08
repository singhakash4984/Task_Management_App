import { Router } from "express";
const authRouter = Router() ;
import { handleValidationError } from "../middleware/handle_validation.middleware";
import { createUserValidator } from "../validators/user.validator";
import { registerUser } from "../controller/auth.controller";

authRouter.post('/register', createUserValidator, handleValidationError, registerUser)
authRouter.post('/login',)

export default authRouter ;