

import { NextFunction, Request, Response } from "express"
import { FilesService } from "./Files.service";


// upload a  files
const createFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const packageId = req.params.id as string;
        const folderId = req.params.id as string;
        const file = req.file;

        if(!file){
            throw new Error("File not uploaded")
        }

        const fileData = await FilesService.createFilesService({userId, packageId, folderId, file})

        res.status(201).json({
            success : true,
            data : fileData,
            message : "File uplaod successfully"
        })

    } catch (err : any) {
        console.error("Error in createFilesController:", err.message);
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        });
    }
}


// get all files 
const GetAllfilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await FilesService.GetAllfilesService()
        res.status(200).json({ success: true, data: result })

    } catch (err) {
        console.log("files data not found")
    }
}


// get user wise created folder 
const GetUserWiseUploadedFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.params.id as string;

        const Result = await FilesService.GetUserWiseUploadedFilesService(userId);
        res.status(200).json({
            success: true,
            data: Result
        });
        return Result

    } catch (err) {
        throw new Error("This user id is not found")
    }
}


// delete files
const DeleteUserWiseUploadedFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = (req as any).user?.id;
        const fileId = req.params.fileId as string;

        if (!userId) {
            throw new Error("User does not exist")
        }

        if (!fileId) {
            throw new Error("File id is required")
        }

        const fileResult = await FilesService.DeleteUserWiseCreatedAllFilesService(userId, fileId)

        res.status(200).json({
            success: true,
            data: fileResult
        })
        return fileResult

    } catch (err) {
        throw new Error("This user id is not found")
    }
}


// rename files name 

const RenameFilesNameController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = (req as any).user?.id;
        const fileId = req.params.fileId as string;
        const {originalFileName} = req.body;

        const fileResult = await FilesService.RenameFileNameSerivce(userId, fileId, originalFileName)

        res.status(200).json({
            success: true,
            data: fileResult,
            message : "File renamed successfully"
        })
        return fileResult
    } catch (err) {
        throw new Error("This user id is not found")
    }
}




export const FilesController = {
    createFilesController,
    GetAllfilesController,
    GetUserWiseUploadedFilesController,
    DeleteUserWiseUploadedFilesController,
    RenameFilesNameController
}