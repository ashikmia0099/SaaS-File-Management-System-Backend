import { Router } from "express";
import { userSelectedPackageController } from "./UserSelectedPackage.controller";
import { AuthMiddleware } from "../../middleware/auth";


const router =Router()

router.get('/', userSelectedPackageController.userSelectedPackageControllerGet)
router.get('/:id',AuthMiddleware, userSelectedPackageController.getSelectedPackageByUserWise)
router.post('/',AuthMiddleware ,userSelectedPackageController.userSelectedPackageControllerPost)

export const UserSelectedPackageRouter = router 