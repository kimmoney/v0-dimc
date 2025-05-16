import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "@/api/db"
// MySQL 연결 풀 생성 (환경변수 사용)
const pool = db.getConnection();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        site_id: { label: "site_id", type: "text", placeholder: "아이디" },
        password: { label: "Password", type: "password", placeholder: "비밀번호" },
      },
      async authorize(credentials, req) {
        try {
          // users 테이블에서 username으로 사용자 조회 (테이블 및 컬럼명은 실제 스키마에 맞게 수정)
          const [rows] = await pool.execute(
            "SELECT * FROM admin_info WHERE site_id = ?",
            [credentials.site_id]
          );
          console.log("DB 쿼리 결과:", rows);
  
          // if (Array.isArray(rows) && rows.length > 0) {
          //   const user = rows[0];
          //   // bcryptjs의 compare로 입력한 비밀번호와 해시된 비밀번호 비교
          //   const isValid = await compare(credentials.password, user.password);
  
          //   if (!isValid) {
          //     return null;
          //   }
  
          //   // 인증 성공 시 필요한 사용자 정보 반환 (JWT에 저장됨)
          //   return {
          //     id: user.id,
          //     name: user.name,
          //     email: user.email,
          //     site_id: user.site_id,
          //   };
          // }
        } catch (error) {
          console.log("Authorize error:", error);
          console.error("Authorize error:", error);
          return null;
        } finally {
          pool.release(); // 반드시 연결 반환
        }
  
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.rank = user.rank;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/management/dashboard", // 사용자 정의 로그인 페이지 경로
  },
});
