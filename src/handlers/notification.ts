import { Request, Response, NextFunction } from "express";

export class Notification {
  constructor() {}

  handle(req: Request, res: Response) {
    res.send(req.body);
  }
}
