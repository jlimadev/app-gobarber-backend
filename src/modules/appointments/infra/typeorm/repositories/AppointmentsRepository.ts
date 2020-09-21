import { getRepository, Repository } from 'typeorm';
import AppointmentEntity from '@modules/appointments/infra/typeorm/entities/AppointmentEntity';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<AppointmentEntity>;

  constructor() {
    this.ormRepository = getRepository(AppointmentEntity);
  }

  public async findByDate(date: Date): Promise<AppointmentEntity | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<AppointmentEntity> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
