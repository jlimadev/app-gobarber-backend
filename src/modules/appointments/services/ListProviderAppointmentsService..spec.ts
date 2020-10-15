import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be to list the appointments on a specific day', async () => {
    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'anyProviderId',
      user_id: 'anyUserId',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const anotherAppointment = await fakeAppointmentsRepository.create({
      provider_id: 'anyProviderId',
      user_id: 'anyUserId',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'anyProviderId',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment, anotherAppointment]);
  });
});
