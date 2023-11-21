import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BcryptHashProvider } from "../providers/hash/HashProvider";
import { JWTProvider } from "../providers/jwt/JWTProvider";

const prisma = new PrismaClient();
const bcrypt = new BcryptHashProvider();
const jwt = new JWTProvider();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      if (await bcrypt.compareHash(password, user.passwordToken)) {
        const token = jwt.generateToken(user.id);
        return res.status(200).send({ token });
      }
    }
    return res.status(404).send("Email ou Senha incorreta");
  } catch (err) {
    return res.status(500).send(err);
  }
};

export { login };
