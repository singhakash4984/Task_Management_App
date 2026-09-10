import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
export const authMidlleware = (req:Request, res:Response, next:NextFunction) =>{
    try {
        const authHeader = req.headers.authorization ;
    const token = authHeader?.split(' ')[1] ;
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }
    const payload = jwt.verify(token,process.env.ACCESS_JWT_SECRET!) as {userId:string} ;
    req.userId = payload.userId ;
    next()
    } catch (error) {
      return res.status(401).json({message:'Invalid or expired token'})  
    }
}