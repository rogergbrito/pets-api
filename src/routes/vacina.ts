import { Router } from 'express';
import { Request, Response } from 'express';
import vacinaController from '../controllers/vacinaController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router
  .route('/vacinas')
  .post(verifyToken, (req: Request, res: Response) =>
    vacinaController.create(req, res),
  );

router
  .route('/vacinas')
  .get((req: Request, res: Response) => vacinaController.getAll(req, res));

router
  .route('/vacinas/:id')
  .get((req: Request, res: Response) => vacinaController.get(req, res));

router
  .route('/vacinas/:id')
  .delete(verifyToken, (req: Request, res: Response) =>
    vacinaController.delete(req, res),
  );

router
  .route('/vacinas/:id')
  .put(verifyToken, (req: Request, res: Response) =>
    vacinaController.update(req, res),
  );

export default router;
