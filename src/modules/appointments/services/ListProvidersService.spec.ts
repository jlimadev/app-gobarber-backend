import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to show all the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const firstUser = await fakeUsersRepository.create({
      name: 'any other name',
      email: 'any.other@email.com',
      password: 'anypassword',
    });

    const secondUser = await fakeUsersRepository.create({
      name: 'yet another name',
      email: 'yet.another@email.com',
      password: 'anypassword',
    });

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([firstUser, secondUser]);
  });
});
