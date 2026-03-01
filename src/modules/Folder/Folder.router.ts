import { Router } from "express";
import { folderController } from "./Folder.controller";
import { AuthMiddleware } from "../../middleware/auth";


const router = Router()

router.get('/',folderController.FolderControllerGet)
router.get('/:id',folderController.GetUserWiseCreatedAllFolderController)
router.post('/',AuthMiddleware,folderController.FolderControllerPost)
router.delete('/delete/:folderId',AuthMiddleware,folderController.DeleteUserWiseCreatedFolderController)
router.patch('/rename/:folderId',AuthMiddleware,folderController.RenameFolderNameController)



export const FolderRouter = router