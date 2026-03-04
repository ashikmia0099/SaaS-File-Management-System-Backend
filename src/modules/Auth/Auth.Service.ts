import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken"

// get all register user service logic

const GetRegisterUserService = async () => {
    try {
        const GetregisterUser = await prisma.user.findMany();
        return GetregisterUser
    } catch (err : any) {
        throw new Error(err.message)
    }
}


// register create service logic

const RegisterService = async (data: {
    name: string
    email: string
    password: string

}) => {
    try {
        const passwordHashed = await bcrypt.hash(data.password, 6)
        const registerUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHashed,
            }
        });
        return registerUser

    } catch (err : any) {
        throw new Error(err.message)
    }
}


// update subscribe package data service logic 

const UpdateUserDataService = async (id: string, data: {
    name: string
    role: "USER" | "ADMIN"
}) => {

    try {
        const CheckData = await prisma.user.findUnique({
            where: { id }
        })

        if (!CheckData) {
            throw new Error("User not found")
        }
        const UpdateData = await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                role: data.role
            }
        })
        return UpdateData

    } catch (err : any) {
        throw new Error(err.message)
    }
}



const LoginService = async (data: {
    email: string
    password: string
}) => {

    try {
        // find user email
        const findEmail = await prisma.user.findUnique({
            where: ({ email: data.email })
        });

        if (!findEmail) {
            throw new Error('This user not exist')
        }

        // compire password 
        const compirePassword = await bcrypt.compare(
            data.password,
            findEmail.password
        )

        if (!compirePassword) {
            throw new Error("Invalid Credintials")
        }

        // generate jwt token
        const token = jwt.sign(
            {
                id: findEmail.id,
                email: findEmail.email,
                role: findEmail.role
            },
            process.env.JWT_SECRET as string, {
            expiresIn: "7d"
        }
        )
        return {
            token,
            user: {
                id: findEmail.id,
                name: findEmail.name,
                email: findEmail.email,
                role: findEmail.role
            }
        }
    } catch (err : any) {
        throw new Error( err.message)
    }
}



export const AuthService = {
    RegisterService,
    GetRegisterUserService,
    UpdateUserDataService,
    LoginService

}