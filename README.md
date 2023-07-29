# PedalHub API

A GraphQL API for managing cycling group rides and subscriptions.

# Table of Contents

    Introduction
    Database
    Data Models
    Queries
    Mutations
    Authentication
    Getting Started
    Usage
    Dependencies
    Author

# Introduction

The PedalHub API is designed to enable users to create and view cycling group rides (pedals). Users can create new pedals with relevant information such as ride name, start date, registration dates, and more. Other users can browse the available pedals and subscribe to join the ride. The API is built using Node.js, TypeScript, Prisma, and GraphQL.

# Database

The API uses PostgreSQL as its database provider, which ensures data persistence for all pedals, subscriptions, and user information.

# Data Models

The API has three main data models:

    User: Represents a registered user with their name, email, password, creation date, and a flag indicating whether they are an admin. Users can subscribe to multiple pedals, and this relationship is established through the subscriptions field.
    Ride: Represents a cycling group ride (pedal). It contains information about the ride's name, start date, registration dates, additional information, starting place, participants limit, and subscribers (users who have subscribed to the ride).
    Subscription: Represents the subscription of a user to a particular ride. It includes the user and ride IDs and the subscription date.

# Queries

The API supports the following queries:

    users(Attention, for this command you must be logged in as an administrator): Retrieves a list of all registered users.
    rides: Retrieves a list of all available rides (pedals). It is also possible to see the names of the participants of each ride
    userSubscriptions(user_id): Retrieves a list of rides to which a user (identified by user_id) has subscribed.

# Mutations

The API provides the following mutations:

    createUser(input: email, password, name): Creates a new user with the specified name, email, and password.
    updateUser(input: email?, password?, name?): Updates the information of an existing user (identified by the authenticated user). Users can update their name, email, or password.
    deleteUser(identified by the authenticated user): Deletes the authenticated user account.
    createRide(input: name, start_date, start_date_registration, end_date_registration, additional_information?, start_place, participants_limit?): Creates a new cycling group ride (pedal) with the provided details.Accepted date format "yyyymmdd"
    subscribeRide(input: ride_id): Subscribes the authenticated user to a specific ride (identified by ride_id).
    login(email, password): Authenticates the user with the provided email and password, returning an authentication token and user details.

# Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access any authenticated endpoints, users must include the JWT token in the "Authorization" header with the format "Bearer <THE.JWT.TOKEN>". Unauthorized requests will receive a 401 status code.

# Getting Started

    This server is online at https://pedalhubapi.onrender.com/graphql but to run it locally follow the steps below.
    Install PostgreSQL and create a new database.
    Set the database URL in the .env file using the DATABASE_URL variable.
    Install the required dependencies using npm or yarn.
    Run the database migration with the command: npx prisma migrate dev --name init.
    Generate the Prisma client with the command: npx prisma generate.
    Set the JWT secret in the .env file using the JWT_TOKEN variable.
    Start the server with the command: npm start or yarn start.
    The server will be accessible at http://localhost:4000/graphql.

# Usage

    Use a GraphQL client (e.g., Apollo GraphQL Playground or Postman) to interact with the API endpoints.
    Register a new user using the createUser mutation.
    Obtain an authentication token by logging in with the login mutation.
    Use the received token in the "Authorization" header for authenticated queries and mutations.

# Dependencies

Install Production Dependencies:

    npm install @apollo/server @prisma/client @types/morgan body-parser cors dotenv express graphql jsonwebtoken morgan prisma typescript

Install Development Dependencies:

    npm install --save-dev @types/cors @types/express @types/jsonwebtoken @types/node

# Author

This API is developed and maintained by Bruno Freire. If you have any questions or feedback, please contact me.
