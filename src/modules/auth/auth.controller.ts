import  type { Request, Response, NextFunction } from "express"
import { register } from "./auth.service";


export const registerController = async (req:Request, res:Response, next:NextFunction) =>{
try {
  const {email,password} = req.body ;
  const user = await register(email,password) ;
  return res.status(201).json({
    message:"User registered successfully",
    user
  })
} catch (error) {
  return res.status(400).json({
    message:(error as Error).message
  })
}
 
}