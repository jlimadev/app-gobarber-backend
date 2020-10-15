import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
providersRouter.use(ensureAuthenticated);

const celebrateValidations = () => {
  return celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  });
};

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrateValidations(),
  providerDayAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrateValidations(),
  providerMonthAvailabilityController.index,
);

export default providersRouter;
