import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: 'anyNewPassword',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith(user.password);
    expect(updatedUser?.password).toBe('anyNewPassword');
  });

  it('Should not be able to reset the password with a non existing token', async () => {
    try {
      await resetPasswordService.execute({
        token: 'anyInvalidIdToken',
        password: 'any password',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to reset the password with a non existing user', async () => {
    try {
      const { token } = await fakeUserTokensRepository.generate(
        'anyInvalidIdUser',
      );

      await resetPasswordService.execute({
        token,
        password: 'any password',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to reset the password with expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: 'anyNewPassword',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
