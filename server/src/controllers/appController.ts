import { Request, Response } from 'express';
import db from '../models/index';

export const appController = (req: Request, res: Response) => {
  res.send('Hello from express App :)');
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await db.User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    return res.status(200).json({
      status: 'success',
      data: user.dataValues,
    });
  } catch (err: any) {
    return res.status(401).json({
      status: 'error',
      message: err.message,
    });
  }
};
