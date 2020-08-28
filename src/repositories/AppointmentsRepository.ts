import { EntityRepository, Repository } from 'typeorm';
import AppointmentEntity from '../models/AppointmentEntity';
@EntityRepository(AppointmentEntity)
class AppointmentsRepository extends Repository<AppointmentEntity> {

  public async findByDate(date: Date): Promise<AppointmentEntity | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    })

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
