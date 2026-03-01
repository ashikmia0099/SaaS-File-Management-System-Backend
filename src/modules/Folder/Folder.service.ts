import { prisma } from "../../lib/prisma"




// create folder
const folderServicePost = async (data: {
    userId: string,
    name: string,
    parentFolderId?: string
}) => {

    try {
        // check active package and package id 
        const checkActivePackage = await prisma.userSelectedPackage.findFirst({
            where: {
                userId: data.userId,
                isActive: true
            },
            include: {
                package: true
            }
        })

        if (!checkActivePackage) {
            throw new Error("This package is not active")
        }

        //  Update old folders with null packageId
        await prisma.folder.updateMany({
            where: {
                userId: data.userId,
                packageId: null
            },
            data: {
                packageId: checkActivePackage.packageId
            }
        });

        // count folder logic
        const countFolder = await prisma.folder.count({
            where: {
                userId: data.userId,
                packageId: checkActivePackage.packageId
            }
        })

        // if maximum folder limit extends show this error
        if (countFolder >= checkActivePackage.package.MaxFolders) {
            throw new Error("Maximum folder limit reached")
        }

        // check parent folder
        if (data.parentFolderId) {
            const findParentFolder = await prisma.folder.findUnique({
                where: { id: data.parentFolderId }
            });

            if (!findParentFolder) {
                throw new Error('Parent folder not found')
            }

            if (checkActivePackage.package.MaxNestingFolder <= 0) {
                throw new Error("Sub folder not allowed in this package")
            }
        }

        // create folder 
        const createfolder = await prisma.folder.create({
            data: {
                userId: data.userId,
                name: data.name,
                parentFolderId: data.parentFolderId || null
            }
        })

        return createfolder

    } catch (err) {
        throw new Error("Failed to create Folder")
    }

}

// get all created folder 
const folderServiceGet = async () => {
    try {
        const result = await prisma.folder.findMany()
        return result
    } catch (err) {
        throw new Error('Faild to fetch folder')
    }
}

// get user wise created folder 
const GetUserWiseCreatedAllFolderService = async (userId: string) => {
    try {

        const getFolder = await prisma.folder.findMany({
            where: { userId },
        })
        return getFolder

    } catch (err) {
        throw new Error("this folder is not found")
    }
}


// delete folder user wise  
const DeleteUserWiseCreatedAllFolderService = async (userId: string, folderId: string) => {
    try {

        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        })

        // check user is valid 
        if (!folder || folder.userId !== userId) {
            throw new Error("Not folder found and you ar not valid user in this folder")
        }

        // chaeck all sub folder 
        const subFolder = await prisma.folder.findMany({
            where: { parentFolderId: folderId }
        })

        // delete sub folder 

        for (const sub of subFolder) {
            await DeleteUserWiseCreatedAllFolderService(userId, sub.id)
        }

        // ToDo  start  : this owrk when i am delete a folder . which time this folder under store any files link image , video which time delete this all all propary in this folder 

        // await prisma.file.deleteMany({
        //     where: { folderId: folderId }
        // });

        // ToDo end 

         const deleteFolder = prisma.folder.delete({
            where: { id: folderId }
        })

        return deleteFolder

    } catch (err) {
        throw new Error("this folder is not found")
    }
}

// update folder name
const RenameFolderNameSerivce = async (userId: string, folderId: string, name : string) => {
    try {

        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        })

        // check user is valid 
        if (!folder || folder.userId !== userId) {
            throw new Error("Not folder found and you ar not valid user in this folder")
        }

        // update folder name
        const FolderRename = prisma.folder.update({
            where: { id: folderId },
            data : {name}
        })

        return FolderRename

    } catch (err) { }
}




export const folderService = {
    folderServicePost,
    RenameFolderNameSerivce,
    folderServiceGet,
    GetUserWiseCreatedAllFolderService,
    DeleteUserWiseCreatedAllFolderService
}