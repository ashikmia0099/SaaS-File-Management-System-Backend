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
    } catch (err) {
        console.log("error in SubscriptionPackageServicePost", err)
        throw err
    }
}

// Get all data service logic 
const SubscriptionPackageServiceGet = async () => {
    try {
        const getResult = await prisma.subscriptionPackage.findMany()
        return getResult
    } catch (err) {
        throw new Error('Faild to fetch subscription package')
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
        
    } catch (err) {
        console.log("error")
    }
}


// Delete Single subscribe package data service logic 

const SubscriptionPackageServiceDelete = async (id: string) => {

    try {
        const CheckData = await prisma.subscriptionPackage.findUnique({
            where: { id }
        })

        if (!CheckData) {
            throw new Error("Subscription not found")
        }

        const deleteData = await prisma.subscriptionPackage.delete({
            where: { id }
        })
        return deleteData

    } catch (err) {
        console.log("error")
    }
}

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

    } catch (err) {
        console.log("error")
    }
}


export const SubscriptionPackageService = {
    SubscriptionPackageServicePost,
    SubscriptionPackageServiceGet,
    SingleSubscriptionPackageService,
    SubscriptionPackageServiceDelete,
    SubscriptionPackageServiceUpdate
}