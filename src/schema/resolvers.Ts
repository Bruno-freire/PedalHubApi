import { userRides, userSubscriptions, users } from '../controllers/userQueryControllers.js';
import { rides } from '../controllers/ridesQueryControllers.js';
import { createUser, deleteUser, login, updateUser } from '../controllers/userMutationControllers.js';
import { createRide, subscribeRide } from '../controllers/ridesMutationControllers.js';

export const resolvers = {
  Query: {
    users: users,
    userRides: userRides,
    userSubscriptions: userSubscriptions,
    rides: rides,
  },
  Mutation: {
    login: login,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    createRide: createRide,
    subscribeRide: subscribeRide,
  },
};
