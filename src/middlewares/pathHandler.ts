import { NextFunction, Request, Response } from "express";

const pathHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} NOT FOUND PATH`);
    res.json({
        statusCode: 401,
        message: `${req.method} ${req.path} NOT FOUND PATH`
    })
}

export default pathHandler