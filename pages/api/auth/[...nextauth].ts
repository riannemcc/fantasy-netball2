import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // debug: process.env.NODE_ENV === "development" ? true : false,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },

  callbacks: {
    // jwt: async (token, user) => {
    //   if (user) {
    //     token.uid = user.id;
    //   }
    //   return Promise.resolve(token);
    // },
    session: async (session, user) => {
      if (user) {
        session.userId = user.id;
        session.userName = user.name;
      }
      return session;
    },

    redirect: async (url) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/profile');
      }
      return Promise.resolve('/api/auth/signin');
    },
  },
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): void | Promise<void> => NextAuth(req, res, options);
