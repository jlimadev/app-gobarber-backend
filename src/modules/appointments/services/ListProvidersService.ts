import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequestDTO): Promise<UserEntity[]> {
    const user = await this.usersRepository.findAllProviders({
      excepetUserId: userId,
    });

    return user;
  }
}

export default ListProvidersService;
