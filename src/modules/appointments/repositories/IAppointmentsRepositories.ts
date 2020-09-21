import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

interface IAppointmentsRepositories {
  create(data: ICreateAppointmentDTO): Promise<AppointmentEntity>;
  findByDate(date: Date): Promise<AppointmentEntity | undefined>;
}

export default IAppointmentsRepositories;
