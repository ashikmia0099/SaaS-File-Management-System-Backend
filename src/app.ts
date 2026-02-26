import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { SubscriptionPackageRouter } from "./modules/SubscriptionPackage/SubscriptionPackage.router";


const app: Application = express()

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/subscription/package', SubscriptionPackageRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


export default app