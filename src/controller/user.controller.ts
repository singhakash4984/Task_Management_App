import {Request,Response,NextFunction} from 'express' ;
import {generateUser} from '../service/user.service'
export const createUser = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {email,password} = req.body ;
       const user = await generateUser(email,password) ;
       res.status(201).json(user) ;
    } catch (error) {
        next(error)
    }
}