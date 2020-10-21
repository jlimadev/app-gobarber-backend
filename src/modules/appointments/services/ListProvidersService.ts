import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<UserEntity[]> {
    const cacheKey = `providers-list:${user_id}`;

    let users = await this.cacheProvider.recover<UserEntity[]>(cacheKey);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        excepetUserId: user_id,
      });

      await this.cacheProvider.save(cacheKey, users);
    }

    return users;
  }
}

export default ListProvidersService;
