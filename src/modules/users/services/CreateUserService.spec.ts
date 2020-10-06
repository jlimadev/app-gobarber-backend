import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual('any name');
  });

  it('Should not be able to create a new user with an used e-mail', async () => {
    try {
      await createUser.execute({
        name: 'any name',
        email: 'any@email.com',
        password: 'anypassword',
      });

      await createUser.execute({
        name: 'any name',
        email: 'any@email.com',
        password: 'anypassword',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('This e-mail is already in use.');
    }
  });
});
