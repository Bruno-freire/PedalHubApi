import {PrismaClient, Ride} from '@prisma/client'

const prisma = new PrismaClient();

export const findRideRepository = async (ride_id): Promise<Ride> => {
  const ride = await prisma.ride.findUnique({ where: { id: ride_id }, include: {subscribers: true} });
  prisma.$disconnect();
  return ride
}