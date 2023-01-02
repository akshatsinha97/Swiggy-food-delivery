import prisma from '../src/instance/prisma-instance';
import bcrypt from 'bcrypt';

async function main() {
  const password = process.env.ADMIN_PASS || '';
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  await prisma.user.create({
    data: {
      firstname: 'Akshat',
      lastname: 'Sinha',
      email: 'akshat@gmail.com',
      password: secPass,
      roles: 'ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
