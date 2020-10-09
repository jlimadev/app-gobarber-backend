import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import UserEntity from '../infra/typeorm/entities/UserEntity';

interface IUsersRepository {
  findById(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<UserEntity[]>;
  create(data: ICreateUserDTO): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
}

export default IUsersRepository;
