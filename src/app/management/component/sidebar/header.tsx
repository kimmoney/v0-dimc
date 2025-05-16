"use client"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { admindata } from "./app-sidebar"
import { usePathname } from "next/navigation"
import { url } from "inspector"
import { isNumberObject } from "util/types"
interface HeaderProps {
  breadcrumbs: {
    href?: string
    label: string
  }[]
}

export function Header({ breadcrumbs }: HeaderProps) {
  const pathname = usePathname();
  const pathlist = pathname.replace("/management/","").split("/");
  let headerPropslist = [];
  let path = pathname;
  let last = true
  while (path != "") {
    const lastPath = path.split("/").slice(-1)[0];
    switch (lastPath) {
      case "edit":
        headerPropslist.push({label: "수정"});
        last = false;
        break;
      case "register":
        headerPropslist.push({label: "등록"});
        last = false;
        break;
      case "management":
        headerPropslist.push({label: "홈",href:"/management/dashboard"});
        last = false;
        break;
      default:
        if (lastPath.match(/^\d+$/) == null) {
          let headerProps = admindata.find((item) => path.startsWith(item.url));
          // console.log({path: path, headerProps: headerProps});
          if (headerProps&&headerProps.url != path) {
            // 요소 내부 iteam의 url을 비교하여 headerProps를 찾는다.
            headerProps = headerProps.items?.find((item) => path.startsWith(item.url)) as typeof headerProps | undefined;
          }
          //   // headerProps = data.navMain.find((item) => item.url.startsWith(path.split("/").slice(0, -1).join("/")));
          if (last){
            headerPropslist.push({label:headerProps?.title || ""});
            last = false;
          }
          else{
            headerPropslist.push({label:headerProps?.title || "", href:headerProps?.url});
          }
        }
      }
    path = path.split("/").slice(0, -1).join("/");
  }
  headerPropslist = headerPropslist.reverse();
  // headerPropslist[-1]에서 herf 요소자체를 제거
  breadcrumbs = headerPropslist;
  
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {/* {breadcrumbs.map((crumb, index) => ( */}
            {headerPropslist.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem className={index < breadcrumbs.length - 1 ? "hidden md:block" : ""}>
                  {index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      {/* 여기 아래에다가 title 넣어줄래 */}
    </header>
    
  )
}

