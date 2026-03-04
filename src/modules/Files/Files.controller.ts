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
        next(err)
    }
}


// get all files 
const GetAllfilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await FilesService.GetAllfilesService()
        res.status(200).json({ success: true, data: result })

    } catch (err) {
        next(err)
    }
}


//  folder wise 
const GetUserWiseUploadedFilesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const folderId = req.params.folderId as string;

        const result = await FilesService.GetUserWiseUploadedFilesService(userId, folderId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err: any) {
        next(err)
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
       next(err)
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
        next(err)
    }
}




export const FilesController = {
    createFilesController,
    GetAllfilesController,
    GetUserWiseUploadedFilesController,
    DeleteUserWiseUploadedFilesController,
    RenameFilesNameController
}