import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<UserEntity> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('This e-mail is already in use.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
