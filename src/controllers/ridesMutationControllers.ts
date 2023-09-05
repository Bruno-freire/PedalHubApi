import { formatDate } from '../utils/formatDate.js';
import CreateRideInput from '../types/rides/CreateRideInput.js';

import { Ride, Subscription } from '@prisma/client';
import { createRideRepository } from '../repositories/rides/useCases/createRideRepository.js';
import { findRideRepository } from '../repositories/rides/useCases/findRideRepository.js';
import { verifyExistingSubscriptionRepository } from '../repositories/subscription/useCases/verifyExistingSubscriptionRepository.js';
import { createSubscription } from '../repositories/subscription/useCases/createSubscription.js';

interface SubscribeRideInput {
  ride_id: number;
}

export const createRide = (parent: any, args: { input: CreateRideInput }): Promise<Ride> => {
  const { input } = args;
  input.start_date = formatDate(input.start_date)
  input.start_date_registration = formatDate(input.start_date_registration)
  input.end_date_registration = formatDate(input.end_date_registration)
  return createRideRepository(input)
}

export const subscribeRide = async (parent: any, args: { input: SubscribeRideInput }, context: any): Promise<Subscription> => {
  if(!context.req.user) return null
  
  const { input } = args;
  const { ride_id } = input;
  const ride = await findRideRepository(ride_id)

  if (!ride) {
    throw new Error('Pedal not found.');
  }

  if (new Date(ride.end_date_registration) < new Date()) {
    throw new Error('Registration for this pedal has closed.');
  }

  const existingSubscription = await verifyExistingSubscriptionRepository(ride_id, context)

  if (existingSubscription) {
    throw new Error('User is already subscribed to this pedal.');
  }

  const subscription = createSubscription(ride_id, context);
  
  return subscription
}