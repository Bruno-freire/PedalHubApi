import { PrismaClient, Ride } from '@prisma/client'
import CreateRideInput from "../../../types/rides/CreateRideInput.js";

const prisma = new PrismaClient();

export const createRideRepository = async (data: CreateRideInput): Promise<Ride> => {
  const Ride = await prisma.ride.create({ data });
  prisma.$disconnect();
  return Ride
}