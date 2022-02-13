import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import nodemailer from 'nodemailer';

import { calculateUserPoints } from '_util/helpers';
import { ApiRequest, ApiResponse } from '_src/types/api';
import middleware from '../../middleware/database';
import { UserDb } from '_src/types/users';
import { Player } from '_src/types/players';

const handler = nextConnect();
handler.use(middleware);

function sendEmail({
  transporter,
  user,
  players,
}: {
  transporter: any;
  user: UserDb;
  players: Player[];
}) {
  const points = calculateUserPoints(user, players);
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    html: `
      <h1 style="color: #000; font-size: 20px;">
        Hello! Here's the latest update for your Fantasy Netball team
      </h1>
      <p style="color: #000; font-size: 16px;">
        Team: ${user.teamname}
      </p>
      <p style="color: #000; font-size: 16px;">
        Points: ${points}
      </p>
      <p style="color: #000; font-size: 16px;">Go check out your leaderboard position at&nbsp;
        <a href="https://fantasynetballuk.com/" style="color: #03989e;">
          fantasynetballuk.com
        </a>
      </p>
      `,
    subject: `Fantasy Netball Update: ${user.teamname}`,
  });
}

handler.post(async (req: ApiRequest, res: ApiResponse) => {
  const session = await getSession({ req });
  let currentUser = null;
  const userEmail = session?.user?.email;

  if (userEmail) {
    currentUser = await req.db
      .collection<UserDb>('users')
      .findOne({ email: userEmail });
  }

  if (currentUser && currentUser.isAdmin) {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const emails = [
        'riannemccartney@googlemail.com',
        'riannemccartney@hotmail.com',
        'bodgeuk12@gmail.com',
      ];

      const [players, users] = await Promise.all([
        req.db.collection<Player>('players').find({}).toArray(),
        req.db
          .collection<UserDb>('users')
          .find({ email: { $in: emails } })
          // .find({ teamPlayers: { $size: 7 } }) // get all users with 7 players in team
          .toArray(),
      ]);

      console.log('users length: ', users.length);
      console.log('players length: ', players.length);

      const sentEmailsPromises = users.map((user) =>
        sendEmail({
          transporter,
          user,
          players,
        })
      );

      const results = await Promise.allSettled(sentEmailsPromises);

      const totalAttemtped = results.length;
      const totalSuccess = results.filter(
        ({ status }) => status === 'fulfilled'
      ).length;
      const totalError = results.filter(
        ({ status }) => status === 'rejected'
      ).length;

      console.log('Total emails attempted: %s', totalAttemtped);
      console.log('Total emails successful: %s', totalSuccess);
      console.log('Total email errors: %s', totalError);

      res.status(200).json({ totalAttemtped, totalSuccess, totalError });
    } catch (error) {
      console.error('Failed to send email: ', error);

      res.status(400).send({
        error: 'Could not send the email',
      });
    }
  } else {
    res.status(401).end(`Not allowed`);
  }
});

export default handler;
