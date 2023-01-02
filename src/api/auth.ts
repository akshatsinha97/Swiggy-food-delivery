import express from 'express';
import prisma from '../instance/prisma-instance';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fetchUser from '../middleware/fetchUser';

const router = express.Router();
router.use(bodyParser.json());

const jwt_secret = process.env.JWT_SECRET || '';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user == null) {
      res
        .status(400)
        .json({ error: 'Please try to login with correct credentials.' });
    }
    const passwordCompare = await bcrypt.compare(
      password,
      user?.password || ''
    );
    if (!passwordCompare) {
      res
        .status(400)
        .json({ error: 'Please try to login with correct credentials.' });
    }
    const payload = {
      user: {
        id: user?.id,
      },
    };
    const authtoken = jwt.sign(payload, jwt_secret);
    res.json({ authtoken });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/getUser', fetchUser, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    res.send(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
