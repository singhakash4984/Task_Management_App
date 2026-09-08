import { body } from "express-validator";

const userValidator = [
    body('email').isEmail().withMessage('must be a valid email') ,
    body('password').notEmpty().isLength({min:8,max:30}).withMessage('password must be atleast 8 character')
]

export default userValidator ;