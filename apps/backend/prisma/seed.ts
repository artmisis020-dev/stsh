import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@starshield.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin1234!";
  const adminLogin = process.env.ADMIN_LOGIN ?? "admin";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log(`Admin user already exists: ${adminEmail}`);
    return;
  }

  await prisma.user.create({
    data: {
      email: adminEmail,
      login: adminLogin,
      passwordHash: await hash(adminPassword, 10),
      role: "admin",
      status: "approved",
    },
  });

  console.log(`Admin user created: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
