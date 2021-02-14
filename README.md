## FANTASY NETBALL

An app to allow users to submit a fantasy netball team alongside the Vitality Netball Superleague 2021. 

Next.js
MongoDB
Next-auth

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.
- `NEXTAUTH_URL`
- `DATABASE_URL`
- `EMAIL_FROM`
- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`
- `GOOGLE_ID`
- `GOOGLE_SECRET`

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` and `MONGODB_DB` environment variables.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI,MONGODB_DB&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)

Tutorials Used 
https://blog.logrocket.com/using-authentication-in-next-js/
https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1

TO DO:

- FIX SIGN IN
- fix margin on leaderboard
- points system 

- fix purge so in tailwind.config so it does what it's meant to. Last time tried to change to js files, stopped all tailwing styles from building in production
- use tailwind to position homepage image
- admin part of site to add points, change players etc?
- once players have been awarded points, update each user's points in db
- add horizontal scroll to stats table

CURRENT ISSUES:

- Where to gather stats, calculate points, update db etc
- if user changes players throughout season, how to cut off points from previous week and then calculate points for new player thereafter
- next auth log in doesnt work in chrome dark mode

Twitter dev portal - https://developer.twitter.com/en/portal/projects/1358524108414324744/apps/20057815/settings
Google dev portal - https://console.developers.google.com/apis/credentials/oauthclient/233392081114-lbufp9v20c9lha32er4bsdtbg8fn8smk.apps.googleusercontent.com?authuser=1&project=fantasy-netball-303412
github dev portal - https://github.com/settings/apps/fantasy-netball
cv