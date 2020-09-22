import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Should be able to upload a new avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'anyfile.jpg',
    });

    expect(user.avatar).toEqual('anyfile.jpg');
  });

  it('Should not be able to upload when is not authenticated', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    try {
      await updateUserAvatar.execute({
        userId: 'anyInvalidId',
        avatarFilename: 'anyfile.jpg',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe(
        'Only authenticated users can change the avatar.',
      );
    }
  });

  it('Should be able update a existing avatar deleting the old one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'anyfile.jpg',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'anyNewfile.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('anyfile.jpg');
    expect(user.avatar).toBe('anyNewfile.jpg');
  });
});
