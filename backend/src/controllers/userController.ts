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

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user: any) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
        if (err) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Credential!"
          });
        }
        if (isMatch) {
          var token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: 86400 // 24 hours
          });
          return res.status(200).send({ 
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            roles: ['ROLE_USER']
          })
        }
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      })
    })
  }
}
