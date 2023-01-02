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
  res.send(category);
});

router.post('/createCategory', async (req, res) => {
  const createCategory = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });
  res.send(
    `Category with name: ${createCategory.name} has been added successfully!`
  );
});

router.patch('/updateCategory/:id', async (req, res) => {
  const updateCategory = await prisma.category.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
    },
  });
  console.log(updateCategory);
  res.send(`Category with id: ${req.params.id} has been updated successfully!`);
});

router.delete('/deleteCategory/:id', async (req, res) => {
  const deleteCategory = await prisma.category.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(
    `Category with name: ${deleteCategory.name} has been deleted successfully!`
  );
});

export default router;
