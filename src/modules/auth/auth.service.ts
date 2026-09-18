import {hash} from "./crypto"
import { createUser, existsByEmail } from "../user/user.repository"

export const register = async(email:string,password:string) =>{
    const exist = await existsByEmail(email) ;
    if(exist){
        throw new Error("User already exist !!")
    }
    const passwordHash = await hash(password) ;

    const user = await createUser(email,passwordHash) ;
    return user ;
}