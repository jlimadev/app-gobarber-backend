import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const celebratePasswordValidations = () => {
  return celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  });
};

const celebrateResetValidations = () => {
  return celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  });
};

passwordRouter.post(
  '/forgot',
  celebratePasswordValidations(),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrateResetValidations(),
  resetPasswordController.create,
);

export default passwordRouter;
