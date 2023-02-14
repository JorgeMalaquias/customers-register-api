import { Request, Response } from "express";

export async function testing(req: Request, res: Response) {
    console.log('chegamo');
    res.send('chegamo');
}