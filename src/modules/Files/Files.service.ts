import { prisma } from "../../lib/prisma"
import { UploadFileToCloudinery } from "./utils/FilesCloudinery"
import { v4 as uuidv4 } from "uuid";


// upload files
const createFilesService = async (data: {
    userId: string,
    packageId: string,
    folderId: string,
    file: any

}) => {
    try {

        // checking active package
        const checkActivePackage = await prisma.userSelectedPackage.findFirst({
            where: {
                userId: data.userId,
                isActive: true
            },
            include: {
                package: true
            }
        })

        // package all data 
        const packageData = checkActivePackage?.package;

        if (!checkActivePackage) {
            throw new Error("This package is not active");
        };

        // check total file limit
        const totalUserFiles = await prisma.file.count({
            where: { userId: data.userId }
        })

        if (totalUserFiles >= packageData?.TotalFileLimit!) {
            throw new Error("Total file limit exceeded")
        };

        // check file per folder limit
        const folderFilecount = await prisma.file.count({
            where: { folderId: data.folderId }
        })

        if (folderFilecount >= packageData?.FilePerFolder!) {
            throw new Error("File per folder exceeded")
        }

        // detect file size MB
        const fileSize = data.file.size / (1024 * 1024);

        if (fileSize >= packageData!.MaxFileSizeMB) {
            throw new Error("File size exceeded")
        }

        // dectect file type 
        const fileType = data.file.mimetype;

        let fileTypeDetected: "image" | "video" | "audio" | "pdf";

        if (fileType.startsWith("image")) {
            fileTypeDetected = "image"
        }
        else if (fileType.startsWith("video")) {
            fileTypeDetected = "video"
        }
        else if (fileType.startsWith("audio")) {
            fileTypeDetected = "audio"
        }
        else if (fileType === "application/pdf") {
            fileTypeDetected = "pdf"
        } else {
            throw new Error("Unsupported file type")
        }

        // chcek allowed file type 
        if (!packageData?.AllowedFileTypes.includes(fileTypeDetected)) {
            throw new Error("This file type is not allowed on you package")
        }

        // upload to cloudiner 
        const fileUrl = await UploadFileToCloudinery(
            data.file.buffer,
            fileTypeDetected
        )

        // upload file 
        const uploadfile = await prisma.file.create({
            data: {
                originalFileName: data.file.originalname,
                renameFileName: `${uuidv4()}-${data.file.originalname}`,
                filePath: fileUrl,
                uploadFilePath: data.file.size,
                uploadFileTypes: fileTypeDetected,
                userId: data.userId,
                folderId: data.folderId
            }
        });
        return uploadfile

    } catch (err: any) {
        throw new Error(err.message)
    }
}


// get all created folder 
const GetAllfilesService = async () => {
    try {
        const result = await prisma.file.findMany()
        return result
    } catch (err: any) {
        throw new Error(err.message)
    }
}



// folder wise file get 
const GetUserWiseUploadedFilesService = async (userId: string, folderId: string) => {
    try {
        const getFiles = await prisma.file.findMany({
            where: {
                userId,
                folderId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return getFiles

    } catch (err: any) {
        throw new Error(err.message)
    }
}


// delete folder user wise  
const DeleteUserWiseCreatedAllFilesService = async (userId: string, fileId: string) => {
    try {

        const filesData = await prisma.file.findUnique({
            where: { id: fileId }
        })

        // check user is valid 
        if (!filesData || filesData.userId !== userId) {
            throw new Error("Not file found and you ar not valid user.")
        }

        const deletefile = prisma.file.delete({
            where: { id: fileId }
        })
        return deletefile

    } catch (err : any) {
        throw new Error(err.message)
    }
}


// update file name
const RenameFileNameSerivce = async (userId: string, fileId: string, originalFileName: string) => {
    try {

        const fileData = await prisma.file.findUnique({
            where: { id: fileId }
        })

        // check user is valid 
        if (!fileData || fileData.userId !== userId) {
            throw new Error("File not found you are not authorized user ")
        }

        // update file name
        const fileRename = await prisma.file.update({
            where: { id: fileId },
            data: {
                originalFileName: originalFileName,
                renameFileName: `${uuidv4()}-${originalFileName}`
            }
        })
        return fileRename

    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const FilesService = {
    createFilesService,
    GetAllfilesService,
    GetUserWiseUploadedFilesService,
    DeleteUserWiseCreatedAllFilesService,
    RenameFileNameSerivce
}