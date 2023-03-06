import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ListsControllers {
  public async findAllLists(req: Request, res: Response) {
    try {
      const list = await prisma.list.findMany({
        orderBy: {
          position: "asc",
        },
        include: {
          tasks: true,
        },
      });

      if (list.length === 0) {
        return res
          .status(404)
          .json({ message: "No momento não existe nenhum usuario." });
      } else {
        return res.send(list);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async findList(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const list = await prisma.list.findUnique({
        where: { id },
        include: {
          tasks: true,
        },
      });

      if (!list) {
        return res
          .status(404)
          .json({ message: "No momento não existe esta lista." });
      } else {
        return res.json(list);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async createList(req: Request, res: Response) {
    try {
      const { name, position, type, color } = req.body;
      const nameExist = await prisma.list.findUnique({ where: { name } });
      if (!nameExist) {
        const list = await prisma.list.create({
          data: { name, position, type, color },
        });
        return res.status(201).send(list);
      }
      return res.json({ message: "Já exite uma lista com esse nome" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async updateList(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const existingList = await prisma.list.findUnique({ where: { name } });
      if (existingList && existingList.id !== id) {
        return res.status(409).json({ message: "List name already exists" });
      } else {
        const list = await prisma.list.update({
          data: {
            ...req.body,
          },
          where: { id },
        });
        if (!list) {
          return res.status(404).json({ message: "Not found list" });
        }
        return res.status(200).json(list);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async deleteList(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const listExists = await prisma.list.findFirst({ where: { id } });
      if (listExists) {
        await prisma.list.delete({ where: { id: id } });
        return res.status(204).json(listExists);
      } else {
        return res.status(404).json({ message: "Not found list " });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new ListsControllers();
