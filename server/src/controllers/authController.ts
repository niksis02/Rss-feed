import { generateJWT } from './../utils/token';
import { Request, Response } from 'express';
import { loginDto, registerDto } from '../dto/auth.dto';
import bcrypt from 'bcryptjs';
import db from '../models/index';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = await registerDto.validateAsync(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);
    const { dataValues } = await db.User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateJWT({
      id: dataValues.id,
      username: dataValues.username,
    });
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: token,
    });
  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = await loginDto.validateAsync(req.body);
    const user = await db.User.findOne({
      where: {
        username,
      },
    });

    if (!user)
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password',
      });

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch)
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password',
      });

    const token = generateJWT({ username: username, id: user.dataValues.id });
    return res.status(201).json({
      status: 'success',
      message: 'user login successfully',
      data: token,
    });
  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};
