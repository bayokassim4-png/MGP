
import { PrismaClient, ProjectStatus, UserStatus } from "@prisma/client";
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  const organisation = await prisma.organisation.upsert({
    where: { slug: "mgp-demo" },
    update: {
      name: "MGP Demo",
      country: "Côte d'Ivoire",
      sector: "Gestion de projets",
      active: true,
    },
    create: {
      name: "MGP Demo",
      slug: "mgp-demo",
      country: "Côte d'Ivoire",
      sector: "Gestion de projets",
      active: true,
    },
  });

  const roleNames = [
    "SUPER_ADMIN",
    "ADMIN",
    "CHEF_PROJET",
    "DAF",
    "UTILISATEUR",
  ];

  await Promise.all(
    roleNames.map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@mgp.local" },
    update: {
      fullName: "Administrateur MGP",
      status: UserStatus.ACTIF,
      organisationId: organisation.id,
    },
    create: {
      email: "admin@mgp.local",
      fullName: "Administrateur MGP",
      status: "ACTIF",
      organisation: {
        connect: { id: organisation.id },
      },
    },
  });

  const project = await prisma.project.upsert({
    where: {
      organisationId_code: {
        organisationId: organisation.id,
        code: "EAU-2026",
      },
    },
    update: {
      name: "Projet Eau Potable 2026",
      status: ProjectStatus.EN_COURS,
      currency: "XOF",
      creatorId: adminUser.id,
    },
    create: {
      name: "Projet Eau Potable 2026",
      code: "EAU-2026",
      status: ProjectStatus.EN_COURS,
      currency: "XOF",
      organisation: {
        connect: { id: organisation.id },
      },
      creator: {
        connect: { id: adminUser.id },
      },
    },
  });

  const superAdminRole = await prisma.role.findUniqueOrThrow({
    where: { name: "SUPER_ADMIN" },
  });

  await prisma.projectUser.upsert({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId: adminUser.id,
      },
    },
    update: {
      roleId: superAdminRole.id,
      isOwner: true,
    },
    create: {
      project: {
        connect: { id: project.id },
      },
      user: {
        connect: { id: adminUser.id },
      },
      role: {
        connect: { id: superAdminRole.id },
      },
      isOwner: true,
    },
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
