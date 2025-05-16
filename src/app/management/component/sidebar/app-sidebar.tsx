"use client"
import { BookOpen, Bot, Frame, Home, Map, PieChart, Settings2, SidebarIcon, SquareTerminal } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import React, { useMemo, useRef } from "react"
import Image from "next/image"
// import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies"

// This is sample data.
const user = {
    name: "shadcn",
    rank: "m@example.com",
    role: "admin",
  }
export const admindata =[
    {
      title: "대시보드",
      url: "/management/dashboard",
      icon: Home,
      tooltip:"현재 전반적인 상황을 모니터링합니다.",
      isActive: true,
    },
    {
      title: "관리자",
      url: "/management/manager",
      icon: SquareTerminal,
      tooltip:"관리자를 관리합니다.",
      isActive: true,
    },
    {
      title: "유저",
      url: "/management/user",
      tooltip:"유저를 관리합니다.",
      icon: Bot,
    },
    {
      title: "커리큘럼",
      url: "/management/curriculum",
      icon: BookOpen,
      tooltip:"추천 커리큘럼 알고리즘과 유저별 커리큘럼럼을 관리합니다.",
      items: [
        {
          title: "추천 커리큘럼",
          url: "/management/curriculum/recommend",
        },
        {
          title: "유저 커리큘럼럼",
          url: "/management/curriculum/user",
        }
      ],
    },
    {
      title: "강의",
      url: "/management/class",
      icon: Settings2,
      tooltip:"강의를 관리합니다.",
      items: [
        {
          title: "강의 관리",
          url: "/management/class/lecture",
        },
        {
          title: "강의 준비물 관리",
          url: "/management/class/supplies",
        }
      ],
    },
    {
      title: "DIMC",
      url: "/management/dimc",
      icon: Settings2,
      tooltip:"DIMC 시험 문제를 관리하고 기록을 열람합니다.",
      items: [
        {
          title: "시험 버전 관리",
          url: "/management/dimc/version",
        },
        {
          title: "시험 기록록 관리",
          url: "/management/dimc/history",
        }
      ],
    },
    {
      title: "성취도 평가",
      url: "/management/problem",
      icon: Settings2,
      tooltip:"성취도 평가를 관리합니다.",
      
    },
  ]
  // admindata에서 2번째 요소 지우고 data에 넣기
export const data = admindata.slice(0,1).concat(admindata.slice(2, admindata.length))
// export function AppSidebar() {

interface UserInfo {
  name: string;
  role: string;
  rank: string;
}

interface AppSidebarProps {
  userInfo: UserInfo;
}
export function AppSidebar({ userInfo }: AppSidebarProps) {
  // console.log(userInfo);
  


  let tabData;
  if (userInfo.role == "관리자") {
    tabData = data;
  } else {
    tabData = admindata;
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <Image
            src="/assets/logo/logo.png"
            alt="Shark Logo"
            width={200}   // 실제 이미지 너비 (예시)
            height={50}   // 실제 이미지 높이 (예시)
            // className="h-8"
            style={{ width: "100%", height: "auto" }}
            priority // 페이지 로드시 우선 로딩되도록 함
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={tabData} />
      </SidebarContent>
      <SidebarFooter>
        {/* {memoName}
         */}
         <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}