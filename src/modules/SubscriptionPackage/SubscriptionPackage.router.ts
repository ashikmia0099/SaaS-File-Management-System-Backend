import { Router } from "express";
import { SubscriptionPackageController } from "./SubscriptionPackage.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/authorizeMiddleware";


const router = Router()

router.post('/',AuthMiddleware,authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerPost)
router.get('/',AuthMiddleware,authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerGet)
router.get('/:id',AuthMiddleware,authorizeRoles("ADMIN"), SubscriptionPackageController.SingleSubscriptionPackageController)
router.delete('/delete/:id',AuthMiddleware,authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerDelete)
router.put('/update/:id',AuthMiddleware,authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerUpdate)

export const SubscriptionPackageRouter = router