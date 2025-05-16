// app/api/management-login/logout/route.js
import {
  NextResponse
} from "next/server";

export async function POST(request) {
  const response = NextResponse.json({
    message: "로그아웃 성공"
  });

  // "token" 쿠키를 만료시킵니다.
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // 이미 만료된 날짜를 설정하여 쿠키를 삭제
  });
  response.cookies.set("userInfo", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // 이미 만료된 날짜를 설정하여 쿠키를 삭제
  });
  return response;
}