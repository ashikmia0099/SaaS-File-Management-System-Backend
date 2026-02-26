import { Router } from "express";
import { SubscriptionPackageController } from "./SubscriptionPackage.controller";


const router = Router()

router.get('/', SubscriptionPackageController.SubscriptionPackageControllerGet)
router.post('/', SubscriptionPackageController.SubscriptionPackageControllerPost)
router.delete('/delete/:id', SubscriptionPackageController.SubscriptionPackageControllerDelete)
router.put('/update/:id', SubscriptionPackageController.SubscriptionPackageControllerUpdate)

export const SubscriptionPackageRouter = router