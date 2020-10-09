import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId: id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { name, email, oldPassword, password } = request.body;

      const createUserService = container.resolve(UpdateProfileService);

      const user = await createUserService.execute({
        userId: id,
        name,
        email,
        oldPassword,
        password,
      });

      delete user.password;

      return response.send(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default ProfileController;
