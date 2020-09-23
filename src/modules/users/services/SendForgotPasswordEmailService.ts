// import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
// import UserEntity from '@modules/users/infra/typeorm/entities/UserEntity';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This user does not exists. Please check the e-mail');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de Recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
