// app/api/auth/[...nextauth]/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "@/api/db";
const pool = db;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        site_id: { label: "site_id", type: "text", placeholder: "아이디" },
        password: { label: "Password", type: "password", placeholder: "비밀번호" },
      },
      async authorize(credentials, req) {
        try {
          const [rows] = await pool.execute(
            "SELECT * FROM admin_info WHERE site_id = ?",
            [credentials?.site_id]
          );
          if (Array.isArray(rows) && rows.length > 0) {
            const user = rows[0];
            console.log(user);
            const isValid = await compare(credentials.password, user.password);
            if (!isValid) return null;
            return {
              id: user.id,
              admin_name: user.admin_name,
              role: user.role,
              rank: user.rank,
            };
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.admin_name = user.admin_name;
        token.role = user.role;
        token.rank = user.rank;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.admin_name,
        role: token.role,
        rank: token.rank,
      };
      return session;
    },
  },
  pages: {
    signIn: "/management/dashboard",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
