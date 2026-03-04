import { NextFunction, Request, Response } from "express";
import { userSelectedPackage } from "./UserSelectedPackage.service";
import { prisma } from "../../lib/prisma";

// create selected package 
const userSelectedPackageControllerPost = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // get user and package id
        const userId = (req as any).user.id;
        const { packageId } = req.body;

        if (!packageId) {
            return res.status(404).json({
                success: false,
                message: "Package id is required"
            })
        }

        const packageData = await userSelectedPackage.userSelectedPackageSericePost(
            userId,
            packageId
        )

        res.status(201).json({
            success: true,
            data: packageData,
            message: "Subscripiton package create successfully"
        })

    } catch (err) {
       next(err);
    }

}

// get all user selected package 
const userSelectedPackageControllerGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.userSelectedPackage.findMany()
        console.log(result)
        res.status(200).json({ success: true, data: result })

    } catch (err) {
        next(err);
    }
}


// get selected package by user wise 

const getSelectedPackageByUserWise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get login user id 
        const userId = req.params.id as string;

        const userData = await userSelectedPackage.getSelectedPackageByUserWise(userId)

        res.status(200).json({
            success: true,
            data: userData,
        })

    } catch (err) {
        next(err);
    }
}

export const userSelectedPackageController = {
    userSelectedPackageControllerPost,
    userSelectedPackageControllerGet,
    getSelectedPackageByUserWise
}