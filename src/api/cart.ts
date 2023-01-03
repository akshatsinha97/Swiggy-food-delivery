import express from 'express';
import prisma from '../instance/prisma-instance';
import bodyParser from 'body-parser';
import fetchUser from '../middleware/fetchUser';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const cart = await prisma.cart.findMany({
    where: {
      userId: parseInt(userId),
    },
  });
  res.send(cart);
});

router.post('/addItem/:foodid', fetchUser, async (req: any, res) => {
  const userId = req.user.id;

  const food = await prisma.food.findFirst({
    where: {
      id: parseInt(req.params.foodid),
    },
  });
  const cart = await prisma.cart.findFirst({
    where: {
      userId: parseInt(userId),
    },
  });
  const cartItem = await prisma.cartItem.create({
    data: {
      foodId: parseInt(req.params.foodid),
      quantity: req.body.quantity,
      cartId: cart?.id || 0,
    },
  });
  await prisma.cart.update({
    where: {
      userId: parseInt(userId),
    },
    data: {
      quantity: (cart?.quantity || 0) + cartItem.quantity,
      CartItem: {
        connect: {
          id: cartItem.id,
        },
      },
    },
  });
  res.send(
    `Food with name: ${food?.name} with quantity ${cartItem.quantity} has been added to cart successfully!`
  );
});

router.patch('/deleteItem/:foodid', fetchUser, async (req: any, res) => {
  const userId = req.user.id;
  const food = await prisma.food.findFirst({
    where: {
      id: parseInt(req.params.foodid),
    },
  });
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      foodId: parseInt(req.params.foodid),
    },
  });
  await prisma.cart.update({
    where: {
      userId: parseInt(userId),
    },
    data: {
      CartItem: {
        disconnect: {
          id: cartItem?.id,
        },
      },
    },
  });
  await prisma.cartItem.delete({
    where: {
      foodId: parseInt(req.params.foodid),
    },
  });
  res.send(
    `Food with name ${food?.name} has been removed from cart successfully!`
  );
});

export default router;
