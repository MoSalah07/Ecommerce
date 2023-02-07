import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDataBase } from "../../../lib/auth/conectDB";
import { vefiyPassword } from "../../../lib/auth/handelPassword";

export const NextOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password, role } = credentials;
        const client = await connectToDataBase();

        const userCollection = client.db('ecommerce').collection("user");
        // console.log(email, password);
        const user = await userCollection.findOne({ email });
        // console.log( credentials )

        if (!user) {
          client.close();
          throw new Error(`No User Found !`);
        }

        const isValid = await vefiyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Could not log you in ");
        }

        // console.log(user)

        return { email: user.email, role: role };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.SECRET_KEY,
};

export default NextAuth(NextOptions);
