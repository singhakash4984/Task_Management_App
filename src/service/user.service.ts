import {pool} from '../config/db' ;
import bcrypt, { genSalt } from 'bcrypt' ;
export const generateUser = async(email:string , password:string) =>{
   const hashPassword = await bcrypt.hash(password, 10) ;
   const user = await pool.query(
    `INSERT INTO users (email , password_hash)
     VALUES ($1,$2) 
     RETURNING id , email, created_at , updated_at`,
     [email , hashPassword]
    
    )

    return user.rows[0] ;
}