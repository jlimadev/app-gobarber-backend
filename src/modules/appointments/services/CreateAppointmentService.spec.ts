import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
  });
  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'anyProviderId',
      user_id: 'anyUserId',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toEqual('anyProviderId');
    expect(appointment.user_id).toEqual('anyUserId');
  });

  it('Should not be able to create two appointments with same date/time', async () => {
    await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'anyProviderId',
      user_id: 'anyUserId',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment in a past date', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with the same user as provider', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'anyEqualId',
        user_id: 'anyEqualId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment before 8a.m and after 17p.m', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'anyProviderId',
        user_id: 'anyUserId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
