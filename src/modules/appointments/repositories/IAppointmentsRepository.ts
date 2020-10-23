import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<AppointmentEntity>;
  findByDate(
    date: Date,
    provider_id: string,
  ): Promise<AppointmentEntity | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<AppointmentEntity[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<AppointmentEntity[]>;
}

export default IAppointmentsRepository;
