import { startOfHour } from 'date-fns';
import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepositories from '../repositories/IAppointmentsRepositories';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepositories) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<AppointmentEntity> {
    const appointmentDate = startOfHour(date);

    const appointmentExists = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentExists) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
