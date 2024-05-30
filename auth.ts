import { log } from "console";
import NextAuth from "next-auth";
import apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
// Your own logic for dealing with plaintext password strings; be careful!
//import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    google,
    apple,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = { name: "lolli", email: "brolli" };

        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if user exists
        //user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      console.log("auth: ", auth, "pathname: ", pathname);
      if (pathname === "/hidden") return !!auth;
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("url: ", url, "baseUrl: ", baseUrl);
      return url;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        "user: ",
        user,
        "account: ",
        account,
        "profile: ",
        profile,
        "email: ",
        email,
        "credentials: ",
        credentials
      );
      return true;
    },
  },
});
