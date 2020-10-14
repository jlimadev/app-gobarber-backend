import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update the profile infos', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const updatedUser = await updateProfile.execute({
      user_id: id,
      name: 'any new name',
      email: 'anynew@mail.com',
    });

    expect(updatedUser.name).toBe('any new name');
  });

  it('Should not be able to update the profile of a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'anyInvalidId',
        name: 'anyName',
        email: 'any@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the email field if the new email is already registered', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name 1',
      email: 'any1@email.com',
      password: 'anypassword',
    });

    await fakeUsersRepository.create({
      name: 'any name 2',
      email: 'any2@email.com',
      password: 'anypassword',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        name: 'any new name',
        email: 'any2@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const updatedUser = await updateProfile.execute({
      user_id: id,
      name: 'any new name',
      email: 'anynew@mail.com',
      oldPassword: 'anypassword',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able to update the password without passing the old password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        name: 'any new name',
        email: 'anynew@mail.com',
        password: 'anyNewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password without passing a wrong old password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'any-password',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        name: 'any new name',
        email: 'anynew@mail.com',
        oldPassword: 'wrong-old-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
