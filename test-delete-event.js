const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.event.deleteMany({
      where: { title: 'Test Event Local' }
    });
    console.log(`✅ Deleted ${result.count} test event(s).`);
  } catch (error) {
    console.error('❌ Error deleting:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
