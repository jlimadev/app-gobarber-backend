import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<UserEntity[]> {
    const user = await this.usersRepository.findAllProviders({
      excepetUserId: user_id,
    });

    return user;
  }
}

export default ListProvidersService;
