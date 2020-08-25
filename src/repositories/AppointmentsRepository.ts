import { isEqual } from 'date-fns';
import AppointmentsEntity from '../models/AppointmentsEntity';

class AppointmentsRepository {
  private appointments: AppointmentsEntity[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): AppointmentsEntity | null {
    const appointmentExists = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return appointmentExists || null;
  }

  public getAll(): AppointmentsEntity[] {
    return this.appointments;
  }

  public create(provider: string, date: Date): AppointmentsEntity {
    const appointment = new AppointmentsEntity(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
