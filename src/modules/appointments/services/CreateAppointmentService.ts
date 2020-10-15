import { startOfHour, isBefore, format, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<AppointmentEntity> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot book in a past date');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create an appointment between 8a.m and 17p.m hours',
      );
    }

    if (user_id === provider_id) {
      throw new AppError(
        'You cannot book with yourself! Please chose another provider',
      );
    }

    const appointmentExists = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentExists) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recepient_id: provider_id,
      content: `Novo agendamento para ${formattedDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
