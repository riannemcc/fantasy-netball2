import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';
import middleware from '../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });
  let currentUser = null;
  if (session && session.userId) {
    currentUser = await req.db
      .collection('users')
      .findOne(ObjectId(session.userId));
  }
  res.json(JSON.parse(JSON.stringify(currentUser)));
});

export default handler;
