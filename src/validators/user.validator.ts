import { body } from "express-validator" ;

export const createUserValidator = [
    body('email').isEmail().withMessage("must be a valid email") ,
    body('password').isLength({min:8}).withMessage('password must be atleast 8 character') 
] ;