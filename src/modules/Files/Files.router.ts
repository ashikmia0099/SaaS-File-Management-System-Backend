import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth";
import { FilesController } from "./Files.controller";
import upload from "../../middleware/multer";


const router = Router()


router.get("/", FilesController.GetAllfilesController)
router.get("/:folderId", AuthMiddleware, FilesController.GetUserWiseUploadedFilesController)
router.post("/upload/:id", AuthMiddleware, upload.single('file'), FilesController.createFilesController)
router.delete("/delete/:fileId",AuthMiddleware,FilesController.DeleteUserWiseUploadedFilesController)
router.patch("/rename/:fileId", AuthMiddleware,FilesController.RenameFilesNameController)

export const FilesRouter = router