import nextConnect from 'next-connect';
import { ApiRequest, ApiResponse } from '_src/types/api';
import { UserDb } from '_src/types/users';
import middleware from '../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req: ApiRequest, res: ApiResponse) => {
  const users = await req.db
    .collection<UserDb>('users')
    .find({})
    .project({
      captain: 1,
      viceCaptain: 1,
      teamPlayers: 1,
      teamname: 1,
      lateEntry: 1,
      exPlayers: 1,
    })
    .limit(600)
    .toArray();
  res.status(200).json(users);
});

export default handler;
