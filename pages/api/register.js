// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../lib/functions/auth';

const Register = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body.data;
    console.log(data);

    const isAlreadyMember = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            phoneNumber: data.phoneNumber,
          },
        ],
      },
    });

    if (isAlreadyMember) {
      return res.status(400).json({
        status: 'error',
        message: 'Email or Phonenumber you provided already exists !',
      });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: bcrypt.hashSync(data.password, 10),
      },
    });

    const token = createRefreshToken(user);
    sendRefreshToken(res, token);

    const accessToken = createAccessToken(user);
    res.send({ user, accessToken });
  } else {
    res.json({ error: true, message: 'Method Not Alowed' });
    // throw new Error(
    //   `The HTTP ${req.method} method is not supported at this route.`
    // );
  }
};

export default Register;
