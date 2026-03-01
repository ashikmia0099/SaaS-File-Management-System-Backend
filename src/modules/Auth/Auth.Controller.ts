import { NextFunction, Request, Response } from "express";
import { AuthService } from "./Auth.Service";


// get all register user 

const GetRegisterUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getalluser = await AuthService.GetRegisterUserService()
        res.status(200).json({ success: true, data: getalluser });
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err instanceof Error ? err.message : err
        });
    };
}

// register user controller logic 

const RegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await AuthService.RegisterService(req.body);
        res.status(201).json({ success: true, data: userData });
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err instanceof Error ? err.message : err
        });
    };
};


// Update user Date

const UpdateUserDataController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;

        const userDataupdate = await AuthService.UpdateUserDataService(id, req.body)
        res.status(200).json({
            success: true,
            message: "User Data Updated successfully",
            data: userDataupdate
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err instanceof Error ? err.message : err
        })
    }
}

// user login controller logic 

const LoginController = async(req: Request, res: Response, next : NextFunction) =>{
    try{

        const userData = await AuthService.LoginService(req.body)
        res.status(200).json({
            success : true,
            message : "User login successfully",
            data : userData
        });
    }catch(err){
        res.status(500).json({
            success : false,
            err : err instanceof Error ? err.message : err
        })
    }
}


export const AuthContrller = {
    RegisterController,
    GetRegisterUserController,
    UpdateUserDataController,
    LoginController
}