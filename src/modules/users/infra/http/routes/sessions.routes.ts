import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

const celebrateSessionsValidations = () => {
  return celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });
};

sessionsRouter.post(
  '/',
  celebrateSessionsValidations(),
  sessionsController.create,
);

export default sessionsRouter;
