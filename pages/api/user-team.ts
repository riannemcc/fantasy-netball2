import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import middleware from '../../middleware/database';
import { ApiRequest, ApiResponse } from '_src/types/api';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ApiRequest, res: ApiResponse) => {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;

  if (userEmail) {
    const data = req.body;

    await req.db.collection('users').updateOne(
      { email: userEmail },
      {
        $set: {
          teamname: data.teamName,
          captain: data.captain,
          viceCaptain: data.viceCaptain,
          teamPlayers: data.teamPlayers,
          exPlayers: data.exPlayers,
        },
      }
    );
    res.status(204).json({
      message: 'ok',
    });
  } else {
    res.status(401).end(`Not allowed`);
  }
});

export default handler;
