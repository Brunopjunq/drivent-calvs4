import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function getBooking(userId: number) {
  await verifyTicketAndEnrollment(userId);

  const booking = await bookingRepository.findBookingbyUserId(userId);

  if(!booking) {
    throw notFoundError();
  }
  return booking;
}

async function createNewBooking(userId: number, roomId: number ) {
  await verifyTicketAndEnrollment(userId);
  
  const room = await bookingRepository.findRoomByRoomId(roomId);

  if(!room) {
    throw notFoundError();
  }

  const roomAvailability = await bookingRepository.countBooking(roomId);

  if(roomAvailability >= room.capacity) {
    throw forbiddenError();
  }

  const userBooking = await bookingRepository.findBookingbyUserId(userId);

  if(userBooking) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking;
}

async function updateUserBooking(roomId: number, userId: number, bookingId: number) {
  const booking = await bookingRepository.findBookingbyBookingId(bookingId);

  if(!booking) {
    throw notFoundError();
  }

  if(userId !== booking.userId || roomId === booking.roomId) {
    throw forbiddenError();
  }

  const room = await bookingRepository.findRoomByRoomId(roomId);

  if(!room) {
    throw notFoundError();
  }

  const roomAvailability = await bookingRepository.countBooking(roomId);

  if(roomAvailability >= room.capacity) {
    throw forbiddenError();
  }

  await bookingRepository.deleteBooking(bookingId);

  const updateBooking = await bookingRepository.createBooking(userId, roomId);

  return updateBooking;
}

const bookingService = {
  getBooking,
  createNewBooking,
  updateUserBooking
};

export default bookingService;
