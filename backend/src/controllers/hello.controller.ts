import { NextFunction, Request, Response } from "express";

export class HelloController {
  public async hello(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json("Hello World");
    } catch (e) {
      next(e);
    }
  }
}

export const helloController = new HelloController();
