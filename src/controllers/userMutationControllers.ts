import { PrismaClient, User } from '@prisma/client';

import dotenv from "dotenv"
dotenv.config()
const prisma = new PrismaClient();
const secret = process.env.JWT_TOKEN
import jwt from 'jsonwebtoken'
import { validateAndTransformEmail } from '../utils/validatedEmail.js';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export const login = async (parent: any, args: {email: string, password: string}): Promise<{token: string, user: User}> => {
  const {email, password} = args
  const formatedEmail = validateAndTransformEmail(email)
  const user = await prisma.user.findUnique({where: {email: formatedEmail}, include: {subscriptions: true}})
  if(!user){
    throw new Error("invalid email or password");
  }

  if(user.password !== password){
    throw new Error("invalid email or password");
  }
  const token = jwt.sign({userEmail: user.email }, secret, { expiresIn: '1h' });

  return {token, user}
}

export const createUser = (parent: any, args: { input: CreateUserInput }): Promise<User> => {
  const { input } = args;
  input.email = validateAndTransformEmail(input.email)
  return prisma.user.create({ data: input });
}

export const updateUser = async (parent: any, args: {input: UpdateUserInput }, context: any): Promise<User> => {
  const { input } = args;

  if(!context.req.user) return null

  const user = context.req.user
  return await prisma.user.update({ where: { id: user.id }, data: input });
}

export const deleteUser = (parent: any, args: any, context: any): Promise<User> => {
  if(!context.req.user) return null
  return prisma.user.delete({ where: { id: context.req.user.id } });
}