import GithubProvider from "next-auth/providers/github";
import User from '@/models/userSchema';
import dbConnect from '@/utils/dbConnect';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    signIn: async ({user, account, profile}) => {
      await dbConnect();
      let dbUser = await User.findOne({ id: user.id });

      if (!dbUser) {
        dbUser = new User({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        });
        await dbUser.save();
      }
      return true;
    },
    session: async ({session, token}) => {
      await dbConnect();
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};