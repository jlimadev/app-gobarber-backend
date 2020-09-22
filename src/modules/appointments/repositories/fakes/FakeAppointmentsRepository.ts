import { v4 as uuidv4 } from 'uuid';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: AppointmentEntity[] = [];

  public async findByDate(date: Date): Promise<AppointmentEntity | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<AppointmentEntity> {
    const appointment = new AppointmentEntity();

    Object.assign(appointment, { id: uuidv4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
