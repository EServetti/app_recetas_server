import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status || 500;
  console.log(error);
  res.json({
    message: error.message || "Internal Server Error",
    status: statusCode,
  });
};

export default errorHandler;
