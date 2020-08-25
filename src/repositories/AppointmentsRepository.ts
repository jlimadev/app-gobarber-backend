import { isEqual } from 'date-fns';
import AppointmentEntity from '../models/AppointmentEntity';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: AppointmentEntity[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): AppointmentEntity | null {
    const appointmentExists = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return appointmentExists || null;
  }

  public getAll(): AppointmentEntity[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): AppointmentEntity {
    const appointment = new AppointmentEntity({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
