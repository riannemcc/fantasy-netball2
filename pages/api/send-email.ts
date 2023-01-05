import { NextApiRequest, NextApiResponse } from 'next';

import mailcomposer from 'mailcomposer';
import { SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';

// IMPORTANT: it needs to be placed outside the Function Handler
const sesClient = new SESClient({
  region: 'eu-west-2', // Change it to match your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// The following two utility functions are needed later on in the handler function

const buildEmail = (emailTo: string) => {
  return mailcomposer({
    to: [emailTo], // success@simulator.amazonses.com (can be used for testing)
    from: process.env.EMAIL_FROM,
    html: `
          <h1>Hello these are your points</h1>
          <p>Points: 5000</p>
          `,
    subject: `Your Fantasy Netball update`,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }

  try {
    // mailcomposer doesn't have type definitions. I could have created them but I decided to be a bit lazy here :)
    buildEmail('riannemccartney@hotmail.com').build(
      async (err: any, message: any) => {
        if (err) {
          throw `Error sending raw email: ${err}`;
        }
        const data = await sesClient.send(
          new SendRawEmailCommand({ RawMessage: { Data: message } })
        );
        console.log('Email Message Id: ', data.MessageId);
      }
    );

    res.status(200).json({ sent: 'ok' });
  } catch (error) {
    console.error(`❌ Failed to send email: `, error);

    return res.status(400).send({
      error: 'Could not send the email',
    });
  }
};
