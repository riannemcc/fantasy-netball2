import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import middleware from '../../middleware/database';
import { ApiRequest, ApiResponse } from '_src/types/api';
import { UserDb } from '_src/types/users';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req: ApiRequest, res: ApiResponse) => {
  const session = await getSession({ req });
  let currentUser = null;
  const userEmail = session?.user?.email;

  if (userEmail) {
    currentUser = await req.db
      .collection<UserDb>('users')
      .findOne({ email: userEmail });
  }
  res.status(200).json(JSON.parse(JSON.stringify(currentUser)));
});

export default handler;
