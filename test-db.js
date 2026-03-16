const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    let user = await prisma.user.findUnique({
      where: { email: 'admin.ascendera@community.go.id' }
    });
    console.log('Found user:', user);
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin.ascendera@community.go.id',
          name: 'Ascendera Admin',
          role: 'ADMIN'
        }
      });
      console.log('Created user:', user);
    }
  } catch (error) {
    console.error('Prisma Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
