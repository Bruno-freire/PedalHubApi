import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyExistingSubscriptionRepository = async (ride_id, context) => {
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      ride_id: ride_id,
      user_id: context.req.user.id,
    },
  });
  return existingSubscription
}