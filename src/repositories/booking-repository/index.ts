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
    include: {
      Room: true,
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

const bookingRepository = {
  findBookingbyUserId,
  createBooking,
  findRoomByRoomId,
  countBooking
};

export default bookingRepository;
