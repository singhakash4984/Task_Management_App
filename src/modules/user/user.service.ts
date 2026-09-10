import { pool } from "../../config/db";
import bcrypt from 'bcrypt'

export const findUser = async (email:string) =>{
 const result = await pool.query(`
    SELECT * FROM users WHERE email = LOWER($1)` , [email])
    return result.rows[0] ;
}

export const registerUser = async (email:string , password:string) =>{

    const hash_password = await bcrypt.hash(password,10) ;

 const result = await pool.query(`
    INSERT INTO users ( email , password )
    VALUES($1 $2)
    RETURNING id, email, created_at, updated_at
    ` , [email,hash_password])

    return result.rows[0] ;
}