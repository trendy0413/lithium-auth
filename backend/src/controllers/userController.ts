import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { JWT_SECRET } from '../util/secrets'

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET)
    res.send({ message: "User was registered successfully!" })
  }
}
