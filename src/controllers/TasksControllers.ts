import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

class TasksControllers {
  public async findAllTasks(req: Request, res: Response) {
    try {
      const task = await prisma.task.findMany();
      if (!task) {
        return res
          .status(404)
          .json({ message: "Não existe nenhuma task criada" });
      }
      return res.status(201).send(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async findTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id },
      });
      if (!task) {
        return res.status(404).json({ message: "Não existe essa task" });
      }
      return res.status(201).send(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async CreateTasks(req: Request, res: Response) {
    try {
      const { name, description, state, degree, listId } = req.body;
      const nameExist = await prisma.task.findUnique({ where: { name } });
      const task = await prisma.task.create({
        data: {
          name,
          description,
          state,
          degree,
          list: {
            connect: { id: listId },
          },
        },
      });
      return res.status(201).send(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async UpdateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, state, degree, listId } = req.body;
      const nameExist = await prisma.task.findUnique({ where: { name } });
      if (nameExist && nameExist.id !== id) {
        res.json({ message: "Já exite uma task com esse nome" });
      } else {
        const task = await prisma.task.update({
          data: {
            name,
            description,
            state,
            degree,
            listId,
          },
          where: { id },
        });
        return res.status(201).send(task);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  public async DeleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskExits = await prisma.task.findFirst({ where: { id } });
      if (taskExits) {
        await prisma.task.delete({ where: { id: id } });
        return res.status(204).json(taskExits);
      } else {
        res.status(404).json({ message: "Essa task não existe" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new TasksControllers();
