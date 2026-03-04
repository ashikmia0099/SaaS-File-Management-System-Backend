import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = 500;
    let errorMessage = "Internal server error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Invalid input data or missing required fields";
    }

    else if (err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 500;
        errorMessage = "Database connection failed. Please try again later.";
    }

    else if (err instanceof Prisma.PrismaClientKnownRequestError) {

        if (err.code === "P2002") {
            statusCode = 400;
            errorMessage = `Duplicate value for field: ${err.meta?.target}`;
        }

        else if (err.code === "P2025") {
            statusCode = 404;
            errorMessage = "Record not found";
        }

        else {
            statusCode = 400;
            errorMessage = "Database request error";
        }
    }

    else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        errorMessage = "Database engine crashed. Please contact support.";
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {

        if (err.code === "P2025") {
            statusCode = 404;
            errorMessage = "Record not found";
        }

        else if (err.code === "P2003") {
            statusCode = 409;
            errorMessage = "Cannot delete because related data exists";
        }

    }

    else if (err.statusCode) {
        statusCode = err.statusCode;
        errorMessage = err.message;
    }


    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV === "development" && { error: err.message }),
    });
};