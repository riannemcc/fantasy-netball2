import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';
import middleware from '../../middleware/database';
import { ApiRequest, ApiResponse } from '_src/types/api';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ApiRequest, res: ApiResponse) => {
  const session = await getSession({ req });
  let currentUser = null;
  const userEmail = session?.user?.email;

  if (userEmail) {
    currentUser = await req.db
      .collection('users')
      .findOne({ email: userEmail });
  }

  if (currentUser && currentUser.isAdmin) {
    const data = req.body;
    if (data.playersGames && data.playersGames.length > 0) {
      await Promise.all(
        data.playersGames.map(({ id, games }) => {
          return req.db.collection('players').updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                games,
              },
            },
            { upsert: true }
          );
        })
      );

      res.status(204).json({});
    } else {
      res.status(400).end(`Missing data`);
    }
  } else {
    res.status(401).end(`Not allowed`);
  }
});

export default handler;
