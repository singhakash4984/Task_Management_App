import argon2 from "argon2"

const ARGON_CONFIG = {
   type: argon2.argon2id ,
   memoryCost: 2**15 ,
   timeCost: 3,
   parallelism: 1,
   hashLength:32
}satisfies{
   type: 0 | 1 | 2 ;
   memoryCost: number ;
   timeCost:number;
   parallelism: number ;
   hashLength:number ;
}

export const hash = async(password:string):Promise<string> => {
    if(!password){
        throw new Error("password is required")
    }
    return await argon2.hash(password,ARGON_CONFIG) ; 
}