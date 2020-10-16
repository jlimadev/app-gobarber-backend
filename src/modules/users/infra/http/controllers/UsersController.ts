import CreateUserService from '@modules/users/services/CreateUserService';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const hashedPassword = await hash(password, 8);

      const user = await createUserService.execute({
        name,
        email,
        password: hashedPassword,
      });

      return response.send(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsersController;
