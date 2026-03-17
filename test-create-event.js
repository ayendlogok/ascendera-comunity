const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database and creating event...');
    const event = await prisma.event.create({
      data: {
        title: 'Test Event Local',
        content: 'This is a test from local test script',
        image: '/ramadan_hero.png'
      }
    });
    console.log('✅ Event created successfully:', event);
  } catch (error) {
    console.error('❌ Prisma Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
