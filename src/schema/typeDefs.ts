export const typeDefs = `#graphql
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
    subscriptions: [Ride!]
  }

  type Ride {
    id: Int!
    name: String!
    start_date: String!
    start_date_registration: String!
    end_date_registration: String!
    additional_information: String
    start_place: String!
    participants_limit: Int
    subscribers: [Subscription!]!
  }

  type Subscription {
    id: Int!
    ride: Ride!
    user: User!
    subscription_date: String!
  }
  

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  input CreateRideInput {
    name: String!
    start_date: String!
    start_date_registration: String!
    end_date_registration: String!
    additional_information: String
    start_place: String!
    participants_limit: Int
  }

  input SubscribeRideInput {
    ride_id: Int!
  }

  type Query {
    users: [User!]!
    rides: [Ride!]
    userRides(user_id: Int!): [Ride!]
    userSubscriptions(user_id: Int!): [Subscription!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser: User!
    createRide(input: CreateRideInput!): Ride!
    subscribeRide(input: SubscribeRideInput!): Subscription
    login(email: String!, password: String!): AuthPayload!
  }
`;