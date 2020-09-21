import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UserEntity from '../infra/typeorm/entities/UserEntity';

interface IUsersRepository {
  findById(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  create(data: ICreateUserDTO): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
}

export default IUsersRepository;
