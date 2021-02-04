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

- work out users points - map over user.team, remove team name, get that player in db and return their points. Have count for all points.
- add users points to db
- fix purge so in tailwind.config so it does what it's meant to. Last time tried to change to js files, stopped all tailwing styles from building in production
- use tailwind to position homepage image
- move out some of the elements from the pages into separate components
- clear team selection form on submit
- order leaderboard by descending points
- First time player scores points, need to add points field to db
- admin part of site to add points, change players etc?

CURRENT ISSUES:

- next-auth -> doesn't recognise email sign in link first time - it redirects straight back to log in page rather than going to profile, have to do it multiple times.
  -> facebook log in doesn't work, unstable app?
  -> Twitter log in doeesn't work
- passport auth -> you can sign up and log in, but profile doesn;'t recognise session
- need to understand how to add a field to user document in mongodb, for team selection
- How does log in work on prod? - do I need to add env variables to vercel?
- Do I need to add prod url to oauth client IDs? (https://console.developers.google.com/apis/credentials/oauthclient)
