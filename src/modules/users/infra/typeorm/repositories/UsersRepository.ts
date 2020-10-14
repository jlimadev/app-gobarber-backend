import { getRepository, Repository, Not } from 'typeorm';
import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAllProviders({
    excepetuser_id,
  }: IFindAllProvidersDTO): Promise<UserEntity[]> {
    let users: UserEntity[];

    if (excepetUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(excepetUserId),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<UserEntity> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
