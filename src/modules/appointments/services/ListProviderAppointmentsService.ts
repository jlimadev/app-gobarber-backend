import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import AppointmentEntity from '../infra/typeorm/entities/AppointmentEntity';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  year: number;
  month: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequestDTO): Promise<AppointmentEntity[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    await this.cacheProvider.save('testing', 'testing');
    // const cachedData = await this.cacheProvider.recover('testing');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
