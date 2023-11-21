import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { BcryptHashProvider } from "../providers/hash/HashProvider";

const prisma = new PrismaClient();
const bcrypt = new BcryptHashProvider();

class UsersControllers {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      if (!users) {
        return res
          .status(404)
          .json({ message: "Não existe nenhuma task criada" });
      }
      return res.status(201).send(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  async CreateUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const [passwordToken] = await Promise.all([
        bcrypt.generateHash(password),
      ]);
      const emailExist = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExist) {
        return res.status(500).send("Esse email já está sendo utilizado");
      } else {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            passwordToken,
          },
        });
        return res.status(201).send(user);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new UsersControllers();
