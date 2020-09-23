import { v4 as uuidv4 } from 'uuid';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: UserEntity[] = [];

  public async findById(id: string): Promise<UserEntity | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<UserEntity> {
    const user = new UserEntity();
    const { name, email, password } = userData;

    Object.assign(user, { id: uuidv4(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
