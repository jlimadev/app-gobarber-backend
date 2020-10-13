import listProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listProviders = container.resolve(listProvidersService);

    const appointment = await listProviders.execute({
      userId,
    });

    return response.json(appointment);
  }
}

export default ProvidersController;
