import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('Should be able to upload a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'anyfile.jpg',
    });

    expect(user.avatar).toEqual('anyfile.jpg');
  });

  it('Should not be able to upload when is not authenticated', async () => {
    try {
      await updateUserAvatar.execute({
        user_id: 'anyInvalidId',
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
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'anyfile.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'anyNewfile.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('anyfile.jpg');
    expect(user.avatar).toBe('anyNewfile.jpg');
  });
});
