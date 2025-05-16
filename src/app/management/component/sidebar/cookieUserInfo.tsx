"use client";

import { useState, useEffect } from "react";

export interface UserInfo {
  name: string;
  role: string;
  rank: string;
}

export function useUserInfo(): UserInfo {
  function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    role: "",
    rank: "",
  });

  useEffect(() => {
    const cookieUserInfo = getCookie("userInfo");
    if (cookieUserInfo) {
      try {
        const decoded = decodeURIComponent(cookieUserInfo);
        const parsedUserInfo = JSON.parse(decoded);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("userInfo 쿠키 파싱 오류:", error);
      }
    }
  }, []);

  return userInfo;
}
