import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserEntity from '../infra/typeorm/entities/UserEntity';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequestDTO): Promise<UserEntity> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError(
        'This e-mail already exists, please choose another email.',
      );
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You must enter the old password to set the new password.',
      );
    }

    if (password && old_password) {
      const checkold_password = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkold_password) {
        throw new AppError(
          'Wrong old password, please enter with the correct one.',
        );
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
