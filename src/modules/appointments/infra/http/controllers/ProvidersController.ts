import listProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listProviders = container.resolve(listProvidersService);

    const appointment = await listProviders.execute({
      user_id,
    });

    return response.json(appointment);
  }
}

export default ProvidersController;
