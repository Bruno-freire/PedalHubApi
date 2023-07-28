import { PrismaClient, Ride, Subscription, User } from '@prisma/client';

const prisma = new PrismaClient();

export const rides = async (): Promise<Ride[] | null> => {
  const rides = await prisma.ride.findMany({
    include: {
      subscribers: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (rides.length === 0) {
    return null;
  }

  return rides.map(ride => ({
    ...ride,
    subscribers: ride.subscribers.filter(subscription => subscription.user !== null),
  }));
};