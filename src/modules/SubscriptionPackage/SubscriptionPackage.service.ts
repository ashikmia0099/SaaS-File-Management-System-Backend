// import { Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"


// post Service logic 
const SubscriptionPackageServicePost = async (data: {
    PackageName: string,
    MaxFolders: number,
    MaxNestingFolder: number,
    AllowedFileTypes: string[]
    MaxFileSizeMB: number,
    TotalFileLimit: number,
    FilePerFolder: number
}) => {
    try {

        const createSubscription = await prisma.subscriptionPackage.create({
            data: data
        })
        return createSubscription
    } catch (err: any) {
        throw new Error(err.message)
    }
}

// Get all data service logic 
const SubscriptionPackageServiceGet = async () => {
    try {
        const getResult = await prisma.subscriptionPackage.findMany()
        return getResult
    } catch (err: any) {
        throw new Error(err.message)
    }
}


// get Single subscribe package data service logic 

const SingleSubscriptionPackageService = async (id: string) => {

    try {
        if (!id) {
            throw new Error("Subscription package not found")
        }
        const CheckData = await prisma.subscriptionPackage.findUnique({
            where: { id }
        })
        return CheckData

    } catch (err: any) {
        throw new Error(err.message)
    }
}


// Delete Single subscribe package data service logic 

const SubscriptionPackageServiceDelete = async (id: string) => {
    const packageData = await prisma.subscriptionPackage.findUnique({
        where: { id }
    });

    if (!packageData) {
        throw new Error("Subscription package not found");
    }

    // check folders
    const relatedFoldersCount = await prisma.folder.count({
        where: { packageId: id }
    });

    // check files via folder
    const relatedFilesCount = await prisma.file.count({
        where: { folder: { packageId: id } }
    });

    if (relatedFoldersCount > 0 || relatedFilesCount > 0) {
        throw new Error("Cannot delete subscription: related data exists");
        
    }

     const deletepackage =  await prisma.subscriptionPackage.delete({
        where: { id }
    });

    return deletepackage
};
// update subscribe package data service logic 

const SubscriptionPackageServiceUpdate = async (id: string, payload: any) => {

    try {
        const CheckData = await prisma.subscriptionPackage.findUnique({
            where: { id }
        })

        if (!CheckData) {
            throw new Error("Subscription not found")
        }

        const UpdateData = await prisma.subscriptionPackage.update({
            where: { id },
            data: payload
        })
        return UpdateData

    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const SubscriptionPackageService = {
    SubscriptionPackageServicePost,
    SubscriptionPackageServiceGet,
    SingleSubscriptionPackageService,
    SubscriptionPackageServiceDelete,
    SubscriptionPackageServiceUpdate
}