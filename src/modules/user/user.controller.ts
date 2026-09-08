import { Request , Response , NextFunction } from "express"
import { findUser, registerUser } from "./user.service";

export const register = async( req:Request, res:Response, next:NextFunction) =>{
    try {
        const {email , password} = req.body ;
        const isPresent = await findUser(email) ;
        if(isPresent){
            return res.status(400).json({message:'user already exists !!'})
        }
         const user = await registerUser(email,password) ;
         res.status(201).json({message:'user registered successfully !!!',
            user
         })
    } catch (error) {
        next(error) ;
    }
}