import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id: id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { name, email, old_password, password } = request.body;

      const createUserService = container.resolve(UpdateProfileService);

      const user = await createUserService.execute({
        user_id: id,
        name,
        email,
        old_password,
        password,
      });

      return response.send(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default ProfileController;
