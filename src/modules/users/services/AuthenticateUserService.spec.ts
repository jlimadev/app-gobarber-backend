import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUserService', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = {
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    };

    await createUser.execute(user);

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate with inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    try {
      await authenticateUser.execute({
        email: 'anywrong@email.com',
        password: 'anypassword',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Incorrect email/password combination.');
    }
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    try {
      await createUser.execute({
        name: 'any name',
        email: 'any@email.com',
        password: 'anypassword',
      });

      await authenticateUser.execute({
        email: 'any@email.com',
        password: 'anywrongpassword',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Incorrect email/password combination.');
    }
  });
});