import prisma from '../config/prisma.js';

beforeAll(async()=>{
    await prisma.short_url.deleteMany()
    await prisma.users.deleteMany()
})

afterAll(async()=>{
    await prisma.short_url.deleteMany()
    await prisma.users.deleteMany()
    await prisma.$disconnect()
})