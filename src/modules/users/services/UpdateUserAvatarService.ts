import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: RequestDTO): Promise<UserEntity> {
    const usersRepository = getRepository(UserEntity);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change the avatar.',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
