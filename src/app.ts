import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { SubscriptionPackageRouter } from "./modules/SubscriptionPackage/SubscriptionPackage.router";
import { AuthRouter } from "./modules/Auth/Auth.router";
import { UserSelectedPackageRouter } from "./modules/UserSelectedPackage/UserSelectedPackage.router";
import { FolderRouter } from "./modules/Folder/Folder.router";
import { FilesRouter } from "./modules/Files/Files.router";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/NotFound404";


const app: Application = express()

app.use(cors({
    origin: "http://localhost:3000",
}));

// app.use(cors({
//     origin: "https://saa-s-file-management-system-fronte-eta.vercel.app",
// }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/subscription/package', SubscriptionPackageRouter)
app.use('/auth', AuthRouter)
app.use('/selected/package', UserSelectedPackageRouter)
app.use('/folder', FolderRouter)
app.use('/files', FilesRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(notFound)
// error handler middleware

app.use(globalErrorHandler)

export default app