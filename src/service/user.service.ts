import {pool} from '../config/db' ;
import bcrypt from 'bcrypt' ;
export const createUser = async(email:string , password:string) =>{
   const hashPassword = await bcrypt.hash(password, 10) ;
   const user = await pool.query(
    `INSERT INTO users (email , password_hash)
     VALUES ($1,$2) 
     RETURNING id , email, created_at , updated_at`,
     [email , hashPassword]
    
    )

    return user.rows[0] ;
}

export const InspectUser = async (email:string) =>{
 const user = await pool.query(
    `SELECT id , email FROM users WHERE email = $1`,[email]
 )
 if(user.rows.length === 0){
   return false ;
 }
 return true ;
}