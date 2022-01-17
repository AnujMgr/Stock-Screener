// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';

const Register = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

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
      return res.json({
        error: true,
        message: 'Email or Phonenumber you provided already exists !',
      });
    }

    const createUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: bcrypt.hashSync(data.password, 10),
      },
    });
    createUser;

    res.json({ success: true });
  } else {
    res.json({ error: true, message: 'Method Not Alowed' });
    // throw new Error(
    //   `The HTTP ${req.method} method is not supported at this route.`
    // );
  }
};

export default Register;
