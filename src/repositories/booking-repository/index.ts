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

const bookingRepository = {
  findBookingbyUserId
};

export default bookingRepository;
