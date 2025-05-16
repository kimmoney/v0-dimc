import React, { ReactNode } from "react";
import { SidebarProvider, SidebarInset} from "@/components/ui/sidebar";
import { AppSidebar } from "./component/sidebar/app-sidebar";
import { Header } from "./component/sidebar/header";
import { getToken } from "next-auth/jwt"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import { signOut } from "next-auth/react";
import "./globals.css";


async function RootLayout({ children, title }){
// authOptions를 사용하여 세션을 가져옴
const session = await getServerSession(authOptions);
console.log({ session });

// if (!session?.user.rank) {
//   redirect("/management-login");
// }
//session에 user가 없으면 로그인 페이지로 리다이렉트
  if (!session?.user) {
    redirect("/management-login");
  }
  return (
    <SidebarProvider>
      <title>Shark 관리페이지</title> 
      <div className="flex h-screen w-screen">
        <AppSidebar userInfo={session.user} />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <Header breadcrumbs={[{ href: "/management/dashboard", label: "홈" }]} />
          
          <div className="flex-1 overflow-y-auto overflow-x-scroll">
            <div className="w">{children}</div>
            {/* <div className="min-w-[800px]">{children}</div> */}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default React.memo(RootLayout);
