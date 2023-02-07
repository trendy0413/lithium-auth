import { NextFunction, Request, Response } from 'express'

export class MainController {
  public allAccess(req: Request, res: Response) {
    res.status(200).send("Public Content."); 
  }
  public userBoard(req: Request, res: Response) {
    res.status(200).send("User Content.");
  }
}