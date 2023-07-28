import { PrismaClient, Ride, Subscription, User } from '@prisma/client';

const prisma = new PrismaClient();

export const users = async (parent: any, args: any, context: any): Promise<User[]> => {
  if (!context.req.user.isAdmin) return null;

  const users = await prisma.user.findMany();

  const usersWithSubscribedRides = await Promise.all(
    users.map(async (user) => {
      const subscribedRides = await prisma.subscription.findMany({
        where: { user_id: user.id },
        include: { ride: true },
      });
      return { ...user, subscriptions: subscribedRides.map((subscription) => subscription.ride) };
    })
  );

  return usersWithSubscribedRides;
};
  
export const userSubscriptions = (parent: any, args: { user_id: number }): Promise<Subscription[]> => {
  const { user_id } = args;
  return prisma.subscription.findMany({ where: { user_id: user_id }, include: {ride: true, user: true} });
};