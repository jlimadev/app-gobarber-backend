import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1233321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toEqual('1233321');
  });

  it('Should not be able to create two appointments with same date/time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    try {
      await createAppointment.execute({
        date: appointmentDate,
        provider_id: '1233321',
      });

      await createAppointment.execute({
        date: appointmentDate,
        provider_id: '1233321',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
