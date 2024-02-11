import { NextAuthOptions } from "next-auth";

import { comparePassword } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            //admin: false
          },
        });

        

        if (!user ) {
          return null;
        }

        const isMatch = await comparePassword(
          credentials?.password!!,
          user.password
        );

        if (isMatch) {
          return user;
        }

        return null;
      },
      
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }
      
      return token;
    },
    async session({ session }) {
      return { ...session };
    },
  },
  
};

export default authOptions;