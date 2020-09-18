import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: RequestDTO): Promise<UserEntity> {
    const usersRepository = getRepository(UserEntity);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('This e-mail is already in use.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
