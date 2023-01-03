import express from 'express';
import prisma from '../instance/prisma-instance';
import bodyParser from 'body-parser';
import fetchUser from '../middleware/fetchUser';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (_, res) => {
  const foods = await prisma.food.findMany();
  res.send(foods);
});

router.get('/:categoryid/', async (req, res) => {
  const categoryFoods = await prisma.food.findMany({
    where: {
      categoryid: parseInt(req.params.categoryid),
    },
  });
  res.send(categoryFoods);
});

router.get('/getFood/:id', async (req, res) => {
  const food = await prisma.food.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(food);
});

router.post('/createFood', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const category = await prisma.category.findFirst({
      where: {
        name: req.body.categoryname,
      },
    });
    const food = await prisma.food.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price || 0),
        categoryid: category?.id || 0,
        image: req.body.image,
      },
    });
    console.log(food);
    res.send(`Food with name: ${req.body.name} has been added successfully!`);
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

router.put('/updateFood/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    if (req.body.name) {
      const updateFood = await prisma.food.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
        },
      });
      res.send(
        `Food with name: ${updateFood.name} has been updated successfully!`
      );
    }
    if (req.body.description) {
      const updateFood = await prisma.food.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          description: req.body.description,
        },
      });
      res.send(
        `Food with name: ${updateFood.name} has been updated successfully!`
      );
    }
    if (req.body.price) {
      const updateFood = await prisma.food.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          price: req.body.price,
        },
      });
      res.send(
        `Food with name: ${updateFood.name} has been updated successfully!`
      );
    }
    if (req.body.image) {
      const updateFood = await prisma.food.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          image: req.body.image,
        },
      });
      res.send(
        `Food with name: ${updateFood.name} has been updated successfully!`
      );
    }
    if (req.body.categoryname) {
      const category = await prisma.category.findFirst({
        where: {
          name: req.body.categoryname,
        },
      });
      const updateFood = await prisma.food.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          categoryid: category?.id,
        },
      });
      res.send(
        `Food with name: ${updateFood.name} has been updated successfully!`
      );
    }
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

router.delete('/deleteFood/:id', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(userId),
    },
  });
  if (user?.roles == 'ADMIN') {
    const deleteFood = await prisma.food.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(
      `Food with name: ${deleteFood.name} has been deleted successfully!`
    );
  } else {
    res.send(
      'This request needs Admin level priviledges. Please try logging in with admin credentials.'
    );
  }
});

export default router;
