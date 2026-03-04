import { NextFunction, Request, Response } from "express";
import { folderService } from "./Folder.service";


// folder controller post 
const FolderControllerPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get user id 
        const userId = (req as any).user.id;
        const { name, parentFolderId } = req.body;

        if (!name) {
            return res.status(404).json({
                success: false,
                message: "Folder name is required"
            })
        }

        const folderData = await folderService.folderServicePost({ userId, name, parentFolderId })

        res.status(201).json({
            success: true,
            data: folderData,
            message: "Folder created successfully"
        })

    } catch (err) {
       next(err)
    }
}


// get all folder 
const FolderControllerGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await folderService.folderServiceGet()
        res.status(200).json({ success: true, data: result })

    } catch (err) {
       next(err)
    }
}


// get user wise created folder 
const GetUserWiseCreatedAllFolderController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.params.id as string

        const folderResult = await folderService.GetUserWiseCreatedAllFolderService(userId)

        res.status(200).json({
            success: true,
            data: folderResult
        })

        return folderResult

    } catch (err : any) {
        throw new Error(err.message)
    }
}



// delete folder

const DeleteUserWiseCreatedFolderController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        const folderId = req.params.folderId as string;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        if (!folderId) {
            return res.status(400).json({ success: false, message: "Folder id is required" });
        }

        const folderResult = await folderService.DeleteUserWiseCreatedAllFolderService(userId, folderId);

        return res.status(200).json({
            success: true,
            data: folderResult
        });

    } catch (err: any) {
        throw new Error(err.message)
    }
}

// rename folder name 

const RenameFolderNameController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = (req as any).user?.id;
        const folderId = req.params.folderId as string;
        const {name} = req.body;

        if (!userId) {
            throw new Error("User does not exist")
        }

        if (!folderId) {
            throw new Error("Folder id is required")
        }

        const folderResult = await folderService.RenameFolderNameSerivce(userId, folderId, name)

        res.status(200).json({
            success: true,
            data: folderResult
        })
        return folderResult

    } catch (err : any) {
        throw new Error(err.message)
    }
}

export const folderController = {
    FolderControllerPost,
    FolderControllerGet,
    GetUserWiseCreatedAllFolderController,
    DeleteUserWiseCreatedFolderController,
    RenameFolderNameController
}

