import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  year: number;
  month: number;
}

type IResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabityService;