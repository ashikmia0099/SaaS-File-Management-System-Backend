import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 5000


async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to the successfully in database!');
        app.listen(port, () => {
            console.log(`server is running port on ${port}`);
        })
    } catch(error) {
        console.log("an error occured", error);
        prisma.$disconnect();
        process.exit(1);
    }
}

export default main()