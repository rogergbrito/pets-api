import dotenv from 'dotenv';
import { Response, Request, NextFunction } from 'express';

dotenv.config();

const accessToken = process.env.AUTH_TOKEN;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers['authorization'];

  if (!authToken) {
    res.status(401).json({ error: 'Token não enviado' });
    return;
  }

  const token = authToken.split(' ')[1];

  if (token !== accessToken) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  next();
};
