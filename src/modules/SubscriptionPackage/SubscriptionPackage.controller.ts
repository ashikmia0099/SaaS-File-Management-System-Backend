import { NextFunction, Request, Response } from "express";
import { SubscriptionPackageService } from "./SubscriptionPackage.service";


// post controller logic 

const SubscriptionPackageControllerPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionData = await SubscriptionPackageService.SubscriptionPackageServicePost(req.body)
        res.status(201).json({ success: true, result: subscriptionData })

    } catch (err) {
        console.log('this is error ')
    }
}

// get controller logic 

const SubscriptionPackageControllerGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getSubscriptionData = await SubscriptionPackageService.SubscriptionPackageServiceGet()
        res.status(200).json(getSubscriptionData);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something want wrong",
            err: err instanceof Error ? err.message : err
        })
    }
}

// delete controller logic 

const SubscriptionPackageControllerDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id as string

        const DeleteSubscriptionData = await SubscriptionPackageService.SubscriptionPackageServiceDelete(id)
        res.status(200).json({
            success: true,
            message: "Subscription package deleted successfully",
            data: DeleteSubscriptionData
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err instanceof Error ? err.message : err
        })
    }
}

// update controller logic 

const SubscriptionPackageControllerUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id as string;
        const payload = req.body;

        const UpdateSubscriptionData = await SubscriptionPackageService.SubscriptionPackageServiceUpdate(id, payload)
        res.status(200).json({
            success: true,
            message: "Subscription package Updated successfully",
            data: UpdateSubscriptionData
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err instanceof Error ? err.message : err
        })
    }
}

export const SubscriptionPackageController = {
    SubscriptionPackageControllerPost,
    SubscriptionPackageControllerGet,
    SubscriptionPackageControllerDelete,
    SubscriptionPackageControllerUpdate
}