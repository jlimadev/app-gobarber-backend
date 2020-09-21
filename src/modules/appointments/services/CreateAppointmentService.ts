import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

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
