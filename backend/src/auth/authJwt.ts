import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};