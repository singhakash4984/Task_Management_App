import { Request, Response, NextFunction } from "express";
import { InspectUser } from "../service/user.service";
import { createUser } from "../service/user.service";

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password} = req.body as { email: string; password: string };
    const existingUser = await InspectUser(email) ;
    if(existingUser){
        return res.status(409).json({ message:"User already exist" })
    }
     const user = await createUser(email,password) ;
        return res.status(201).json({ message:"User created successfully !!!",
            user
        })
    // TODO: continue registration flow
  } catch (error) {
    next(error);
  }
};