import bcrypt from 'bcryptjs';
import prisma from '../../prisma/client';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../lib/functions/auth';

export default async function login(req, res) {
  const { email, password } = req.body.data;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return new Promise((resolve) => {
    const { method } = req;
    try {
      switch (method) {
        case 'POST':
          /* Get Post Data */
          /* Any how email or password is blank */
          if (!email || !password) {
            return res.status(400).json({
              status: 'error',
              error: 'Request missing username or password',
            });
          }
          /* Check user email in database */
          //   const user = USERS.find((user) => {
          //     return user.email === email;
          //   });
          /* Check if exists */
          if (!user) {
            /* Send error with message */
            res.status(400).json({
              status: 'error',
              error: 'Incorrect username or password',
            });
          }
          /* Variables checking */
          if (user) {
            const userPassword = user.password;
            /* Check and compare password */
            bcrypt.compare(password, userPassword).then((isMatch) => {
              /* User matched */

              if (isMatch) {
                const payload = {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                };
                /* Create JWT Payload */
                const token = createRefreshToken(user);
                sendRefreshToken(res, token);
                const accessToken = createAccessToken(user);

                return res.status(200).json({ success: true, accessToken, user: payload });
              } else {
                /* Send error with message */
                res.status(400).json({
                  status: 'error',
                  error: 'UserName Or Password incorrect',
                  accessToken: '',
                });
              }
            });
          } else {
            res.status(400).json({
              status: 'error',
              error: 'Incorrect username or password',
            });
          }
          break;
        case 'PUT':
          break;
        case 'PATCH':
          break;
        default:
          break;
      }
    } catch (error) {
      throw error;
    }
    return resolve();
  });
}
