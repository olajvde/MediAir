import { PrismaClient } from '@prisma/client';

declare const global: any;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma;