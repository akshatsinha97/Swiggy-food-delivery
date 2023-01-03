import express from 'express';
import prisma from '../instance/prisma-instance';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import fetchUser from '../middleware/fetchUser';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const users = await prisma.user.findMany();
    res.send(users);
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

router.get('/getUser/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN' || user?.id == userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (user == null) {
      res.send(`User with id: ${req.params.id} does not exist.`);
    }
    console.log(user);
    res.send(user);
  } else {
    res.send(
      'Request not allowed. Please sign in with your user account or admin account.'
    );
  }
});

router.post('/createUser', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  try {
    const addUser = await prisma.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: secPass,
        roles: 'USER',
      },
      select: { id: true },
    });
    await prisma.cart.create({
      data: {
        quantity: 0,
        user: {
          connect: { id: addUser.id },
        },
      },
    });
    console.log(addUser);
    res.send(
      `User with name ${req.body.firstname} has been added successfully!`
    );
  } catch (err) {
    console.log('%c Line:51 🥟 err', 'color:#ed9ec7', err);
    res.send(
      `Kindly fill firstname, email address & password which are all mandatory fields.`
    );
  }
});

router.put('/updateUser/', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.id == userId) {
    if (req.body.firstname) {
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          firstname: req.body.firstname,
        },
      });
      console.log(updateUser);
    }
    if (req.body.lastname) {
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          lastname: req.body.lastname,
        },
      });
      console.log(updateUser);
    }
    res.send(`User with id: ${userId} has been updated successfully!`);
  } else {
    res.send('Request not allowed. Please sign in with your user account.');
  }
});

router.delete('/deleteUser/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN' || user?.id == userId) {
    const deleteUser = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteUser == null) {
      res.send(`User with id: ${req.params.id} does not exist.`);
    } else {
      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      console.log(deleteUser);
      res.send(
        `User with name: ${deleteUser.firstname} is deleted successfully!`
      );
    }
  } else {
    res.send(
      'Request not allowed. Please sign in with your user account or admin account.'
    );
  }
});

export default router;
