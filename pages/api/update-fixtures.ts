import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
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
    const { homeTeam, awayTeam, startDateTime } = req.body;

    if (homeTeam && awayTeam && startDateTime) {
      await req.db.collection('games').insertOne({
        homeTeam,
        awayTeam,
        startDateTime,
      });
      res.status(201).json({
        message: 'ok',
      });
    } else {
      res.status(400).end('Bad Request');
    }
  } else {
    res.status(401).end('Not allowed');
  }
});

export default handler;
