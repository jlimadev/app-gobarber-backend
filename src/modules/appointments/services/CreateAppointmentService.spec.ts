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
      provider_id: 'anyProviderId',
      user_id: 'anyUserId',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toEqual('anyProviderId');
    expect(appointment.user_id).toEqual('anyUserId');
  });

  it('Should not be able to create two appointments with same date/time', async () => {
    const appointmentDate = new Date();

    try {
      await createAppointment.execute({
        date: appointmentDate,
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      });

      await createAppointment.execute({
        date: appointmentDate,
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
