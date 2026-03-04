import { prisma } from "../../lib/prisma"

// get login user selected package 

const getSelectedPackageByUserWise = async (userId : string) => {
    try {
        // find all selected package for this login user 

        const getResult = await prisma.userSelectedPackage.findMany({
            where: {
                userId
            }, 
            include :{
                package : true
            }
        });

        return getResult;
        
    } catch(err : any) {
        throw new Error(err.message)
    }
}


// user selected post
const userSelectedPackageSericePost = async (userId: string, packageId: string) => {
    try {

        // check user active package
        const CheckActivePackage = await prisma.userSelectedPackage.findFirst({
            where: {
                userId: userId,
                isActive: true
            }
        })

        // deactive user current package 
        if (CheckActivePackage) {
            await prisma.userSelectedPackage.update({
                where: { id: CheckActivePackage.id },
                data: {
                    isActive: false,
                    packageEndDate: new Date()
                }
            });
        }

        // create new subscription
        const newSubscripiton = await prisma.userSelectedPackage.create({
            data: {
                userId: userId,
                packageId: packageId,
                packageStatDate: new Date(),
                isActive: true
            }
        })

        return newSubscripiton

    } catch (err : any) {
        throw new Error(err.message)
    }
}

export const userSelectedPackage = {
    userSelectedPackageSericePost,
    getSelectedPackageByUserWise
}
