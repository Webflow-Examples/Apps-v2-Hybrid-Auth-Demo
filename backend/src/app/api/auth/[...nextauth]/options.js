import GithubProvider from "next-auth/providers/github";
import User from '@/models/userSchema';
import dbConnect from '@/utils/dbConnect';

// The authOptions object contains options for NextAuth.js authentication.
export const authOptions = {
  // "providers" property is an array of providers used for authentication.
  providers: [
    // Here, GithubProvider is used for GitHub authentication.
    GithubProvider({
      // The GitHub app's OAuth 2.0 Client ID and Client Secret are required for GitHub OAuth.
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  // "callbacks" property is an object that can be used to control the authentication flow.
  callbacks: {
    // "signIn" callback is invoked when a user signs in.
    signIn: async ({user, account, profile}) => {
      // Connect to MongoDB.
      await dbConnect();
      // Look for an existing user in the database.
      let dbUser = await User.findOne({ id: user.id });

      // If user does not exist, create a new user and save it to the database.
      if (!dbUser) {
        dbUser = new User({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        });
        await dbUser.save();
      }
      // Return true to indicate the sign in was successful.
      return true;
    },
    // "session" callback is invoked whenever a session is accessed.
    session: async ({session, token}) => {
      // Connect to MongoDB.
      await dbConnect();
      // If there is a user in the session and a subject identifier in the token,
      // update the user's id in the session with the subject identifier from the token.
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      // Return the updated session.
      return session;
    },
  },
};