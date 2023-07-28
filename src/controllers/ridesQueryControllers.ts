import { PrismaClient, Ride, Subscription, User } from '@prisma/client';

const prisma = new PrismaClient();

export const rides = async (): Promise<(Ride & { subscribers: (Subscription & { user: User })[] })[] | null> => {
  const rides = await prisma.ride.findMany({
    include: {
      subscribers: {
        include: {
          user: true
        }
      }
    }
  });

  if (rides.length === 0) {
    return null;
  }

  return rides.map(ride => ({
    ...ride,
    subscribers: ride.subscribers.map(subscription => ({
      ...subscription,
      user: subscription.user || null
    })) || []
  }));
};
