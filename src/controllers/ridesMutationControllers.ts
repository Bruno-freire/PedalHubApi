import { PrismaClient, Ride, Subscription } from '@prisma/client';
import { formatDate } from '../utils/formatDate.js';

const prisma = new PrismaClient();

interface CreateRideInput {
  name: string;
  start_date: string;
  start_date_registration: string;
  end_date_registration: string;
  additional_information?: string;
  start_place: string;
  participants_limit?: number;
}

interface SubscribeRideInput {
  ride_id: number;
}

export const createRide = (parent: any, args: { input: CreateRideInput }): Promise<Ride> => {
  const { input } = args;
  input.start_date = formatDate(input.start_date)
  input.start_date_registration = formatDate(input.start_date_registration)
  input.end_date_registration = formatDate(input.end_date_registration)
  return prisma.ride.create({ data: input });
}

export const subscribeRide = async (parent: any, args: { input: SubscribeRideInput }, context: any): Promise<Subscription> => {
  if(!context.req.user) return null
  
  const { input } = args;
  const { ride_id } = input;
  const ride = await prisma.ride.findUnique({ where: { id: ride_id }, include: {subscribers: true} });

  if (!ride) {
    throw new Error('Pedal not found.');
  }

  if (new Date(ride.end_date_registration) < new Date()) {
    throw new Error('Registration for this pedal has closed.');
  }

  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      ride_id: ride_id,
      user_id: context.req.user.id,
    },
  });

  if (existingSubscription) {
    throw new Error('User is already subscribed to this pedal.');
  }
  
  return prisma.subscription.create({
    data: {
      ride: { connect: { id: ride_id } },
      user: { connect: { id: context.req.user.id } }
    },
  });
}