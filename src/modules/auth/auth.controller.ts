import { Request, Response, NextFunction } from "express";
import {findUser} from "../user/user.service" ;
import {User} from "../../types/user"
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;

export const userLogin = async(req:Request, res:Response, next:NextFunction) =>{
    try {
       const {email , password}  = req.body as {email:string , password:string} ;
       const user:User = await findUser(email) ;
       if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({message:'Invalid credentials'}) ;
       }

       const accessToken =  jwt.sign({userId:user.id},process.env.ACCESS_JWT_SECRET!,{expiresIn:'15m'}) ;
       const refreshToken = jwt.sign({userId:user.id},process.env.REFRESH_JWT_SECRET!,{expiresIn:'7d'}) ;

       res.cookie('refreshToken',refreshToken,{
         httpOnly:true ,
         secure:process.env.NODE_ENV === 'production',
         sameSite:'strict',
         maxAge: 7 * 24 * 60 * 60 * 1000 ,
       })

       return res.status(200).json({
        message:'user logged in successfully !!!',
        token:accessToken
       })
    } catch (error) {
       next(error) 
    }
}

export const refresh = (req:Request, res:Response, next:NextFunction) =>{
   try {
      const refreshToken = req.cookies?.refreshToken ;
      if(!refreshToken){
         res.status(401).json({message:'No refresh token provided !'})
      }
      const payload = jwt.verify(refreshToken,process.env.REFRESH_JWT_SECRET!) as {userId:string} ;
      const newAccessToken = jwt.sign({userId:payload.userId},process.env.ACCESS_JWT_SECRET!,{expiresIn:'15m'}) ;

      return res.status(200).json({token:newAccessToken})
   } catch (error) {
      res.status(401).json({message:'invalid or expiredrefresh token !!'})
   }
}