import { PrismaClient } from 'generated/prisma/client';
const prisma: PrismaClient = new PrismaClient();

async function main() {
  await prisma.assetType.upsert({
    where: { name: 'PARKING' },
    update: {},
    create: { name: 'PARKING' },
  });

  await prisma.assetType.upsert({
    where: { name: 'CHARGING_STATION' },
    update: {},
    create: { name: 'CHARGING_STATION' },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
