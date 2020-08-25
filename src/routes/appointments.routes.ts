import { isEqual, parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentExists = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (appointmentExists) {
    return response
      .status(400)
      .json({ message: ' This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  response.json(appointments);
});

export default appointmentsRouter;
