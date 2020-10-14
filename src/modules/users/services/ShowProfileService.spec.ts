import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show the profile', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'any name',
      email: 'any@email.com',
      password: 'anypassword',
    });

    const user = await showProfile.execute({
      user_id: id,
    });

    expect(user.name).toBe('any name');
    expect(user.email).toBe('any@email.com');
  });

  it('Should not be able to show the profile of a non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'anyInvalidId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
