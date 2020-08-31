import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import UserEntity from '../models/UserEntity';

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
      throw new Error('Only authenticated users can change the avatar.');
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
