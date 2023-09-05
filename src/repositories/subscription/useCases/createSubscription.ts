import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSubscription = async (ride_id, context) => {
  const subscription = await prisma.subscription.create({
    data: {
      ride: { connect: { id: ride_id } },
      user: { connect: { id: context.req.user.id } }
    },
  });
  return subscription
}