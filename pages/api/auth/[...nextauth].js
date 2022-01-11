import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const host = process.env.NEXTAUTH_URL;

        const userdata = await axios.get(`${host}/api/user`, {
          params: { username: user.email },
        });

        if (!userdata || !userdata.data || userdata.data.length <= 0) {
          const response = await axios.post(`${host}/api/signup`, {
            email: user.email,
            username: user.email,
            password: uuidv4(),
            name: user.name,
          });
          console.log({ response });
        }
      } catch (error) {
        console.log({ error });
      }
      return true;
    },
  },
});
