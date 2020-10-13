import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '1233321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toEqual('1233321');
  });

  it('Should not be able to create two appointments with same date/time', async () => {
    const appointmentDate = new Date();

    try {
      await createAppointment.execute({
        date: appointmentDate,
        providerId: '1233321',
      });

      await createAppointment.execute({
        date: appointmentDate,
        providerId: '1233321',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
