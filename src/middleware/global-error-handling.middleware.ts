import type { Request, Response, NextFunction } from "express";

export const errorHandlingMiddleware =(
    req:Request,
    res:Response,
    next:NextFunction,
    err:Error
) => {
    res.json({error:err})
}
