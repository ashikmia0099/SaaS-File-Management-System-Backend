import { Router } from "express";
import { AuthContrller } from "./Auth.Controller";


const router = Router()


router.get('/users', AuthContrller.GetRegisterUserController)
router.post('/register', AuthContrller.RegisterController)
router.post('/login', AuthContrller.LoginController)
router.put('/update/:id', AuthContrller.UpdateUserDataController)



export const AuthRouter = router 