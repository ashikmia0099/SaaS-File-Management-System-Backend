import { NextFunction, Response } from "express"


export const authorizeRoles = (...roles: string[]) =>{
    return(req : any , res: Response, next : NextFunction) =>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                message : "Forbidden access denied!"
            })
        }
        next()
    }
}