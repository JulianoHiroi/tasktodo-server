import jwt = require("jsonwebtoken");
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findUser } from "../services/user.service";
const SECRET = process.env.JWT_SECRET;
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send(401);
  }

  const parts = authorization.split(" ");
  if (parts.length !== 2) {
    return res.send(401);
  }
  const [schema, token] = parts;

  if (schema !== "Bearer") {
    return res.send(401);
  }
  if (SECRET) {
    jwt.verify(token, SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid!" });
      }
      const decodedJwt = decoded as JwtPayload;
      if (decodedJwt && "id" in decodedJwt) {
        const user = await findUser(decodedJwt.id);
        if (!user || !user.id) {
          return res.status(401).send({ message: "Token Inválido" });
        }

        req.body = { ...req.body, UserId: user.id };
        return next();
      } else {
        return res.status(401).send({ message: "Invalid token format!" });
      }
    });
  } else {
    throw new Error("Senha para criação do token não configurada");
  }
};
