import { prisma } from "@/config";

async function findBookingbyUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    include: {
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function findRoomByRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

async function countBooking(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId
    }
  });  
}

async function deleteBooking(bookingId: number) {
  return await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });  
}

async function findBookingbyBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId }
  });
}

const bookingRepository = {
  findBookingbyUserId,
  createBooking,
  findRoomByRoomId,
  countBooking,
  findBookingbyBookingId,
  deleteBooking
};

export default bookingRepository;
