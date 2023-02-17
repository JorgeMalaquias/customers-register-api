import { NextFunction, Request, Response } from "express";

export class ParamsValidate {
    execute(req: Request, res: Response, next: NextFunction) {
        const { page, size } = req.query;
        if ((!page) || (!size)) {
            throw ({ type: 'bad_request', message: 'It should be informed a page number and a size number by queries!' });
        }
        next();
    }
}