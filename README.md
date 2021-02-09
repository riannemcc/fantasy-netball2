## FANTASY NETBALL

What the app should do:

- user can sign up, log in and log out
- user can select 10 players from the league and add them to their own fantasy team
- user can pick one of their players to be a captain and one to be a VC
- user can view stats page with the points that each player has earned in the league thus far, grouped by team
- user can view a leaderboard which displays all fantasy teams and their accrued points in descending order
- user can view the fantasy rules

- app should have data on all league matches and assign points to each player
- app should consider the ten players in each user's team and assign correct number of points per week
- app should double the points for a captain and 1.5x for a VC

Future:

- user can switch team players mid-season
- scrape VNSL page for stats info

##

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
- `FACEBOOK_ID`
- `FACEBOOK_SECRET`

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

https://blog.logrocket.com/using-authentication-in-next-js/
https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1

TO DO:

- add numbers to each line of leaderboard
- fix purge so in tailwind.config so it does what it's meant to. Last time tried to change to js files, stopped all tailwing styles from building in production
- use tailwind to position homepage image
- admin part of site to add points, change players etc?
- hide/disable player sin dropdown menus that have already been selected for another position
- once team has been submitted, prevent from amending
- once players have been awarded points, update each user's points in db
- straighten up team selection form or come up with better design
- re-poisiton tables on desktop view for profile page

CURRENT ISSUES:

- Where to gather stats, calculate points, update db etc

Twitter dev portal - https://developer.twitter.com/en/portal/projects/1358524108414324744/apps/20057815/settings
Google dev portal - https://console.developers.google.com/apis/credentials/oauthclient/233392081114-lbufp9v20c9lha32er4bsdtbg8fn8smk.apps.googleusercontent.com?authuser=1&project=fantasy-netball-303412
github dev portal - https://github.com/settings/apps/fantasy-netball
