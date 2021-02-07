import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      state: false,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      state: false,
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

    redirect: async (url, _) => {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/profile");
      }
      return Promise.resolve("/api/auth/signin");
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
