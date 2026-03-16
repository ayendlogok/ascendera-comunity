const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully!');
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Query result count:', users.length);
  } catch (error) {
    console.error('Prisma Connection Crash:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
