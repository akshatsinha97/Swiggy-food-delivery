import fetchUser from '../middleware/fetchUser';
import express from 'express';
import prisma from '../instance/prisma-instance';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (_, res) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
});

router.get('/getCategory/:id', async (req, res) => {
  const category = await prisma.category.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (category) {
    res.send(category);
  } else {
    res.send(`Category with id: ${req.params.id} not found`);
  }
});

router.post('/createCategory', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const createCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    res.send(
      `Category with name: ${createCategory.name} has been added successfully!`
    );
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

router.patch('/updateCategory/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const updateCategory = await prisma.category.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });
    console.log(updateCategory);
    res.send(
      `Category with id: ${req.params.id} has been updated successfully!`
    );
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

router.delete('/deleteCategory/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const deleteCategory = await prisma.category.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(
      `Category with name: ${deleteCategory.name} has been deleted successfully!`
    );
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

export default router;
