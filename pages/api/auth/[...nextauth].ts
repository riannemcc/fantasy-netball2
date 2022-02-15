import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '_util/mongodb-adapter-callback';

const options = {
  debug: process.env.NODE_ENV === 'development' ? true : false,
  providers: [
    EmailProvider({
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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): void | Promise<void> => NextAuth(req, res, options);
