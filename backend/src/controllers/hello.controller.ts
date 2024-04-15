import { NextFunction, Request, Response } from "express";

async function hello(req: Request, res: Response, next: NextFunction) {
  try {
    return res.sendStatus(200).json("Hello World");
  } catch (e) {
    next(e);
  }
}

export { hello };
