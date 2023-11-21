import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUser = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
