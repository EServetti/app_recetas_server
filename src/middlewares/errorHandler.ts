import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  console.log(error);
  res.json({
    message: error.message || "Internal Server Error",
    statusCode: statusCode,
  });
};

export default errorHandler;
