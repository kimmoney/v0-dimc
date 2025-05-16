//src/app/management/component/navbar.js
'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./navbar.css";
import path from "path";

// 쿠키를 읽어오는 헬퍼 함수

function Navbar() {
  // userInfo 초기값 동기적 읽기
  const [userInfo, setUserInfo] = useState({});
  const pathname = usePathname();
  const router = useRouter();

  // pathname에 따른 그룹의 기본(open) 상태를 계산 (useMemo 사용)
  const computedOpenGroup = useMemo(() => {
    if (pathname.startsWith("/management/curriculum")) return "curriculum";
    if (pathname.startsWith("/management/class")) return "class";
    if (pathname.startsWith("/management/dimc")) return "dimc";
    if (pathname.startsWith("/management/problem")) return "problem";
    if (pathname.startsWith("/management/manager")) return "manager";
    if (pathname.startsWith("/management/user")) return "user";
    return null;
  }, [pathname]);

  // 사용자가 직접 토글한 그룹 상태를 저장 (없으면 null)
  const [userToggledGroup, setUserToggledGroup] = useState(null);
  // 최종적으로 적용할 그룹 상태: 사용자가 토글한 값이 있으면 그것을, 없으면 pathname에 따른 computed 값을 사용
  const effectiveOpenGroup = userToggledGroup !== null ? userToggledGroup : computedOpenGroup;

  // 쿠키 업데이트 (페이지 로딩 시 userInfo 업데이트)
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

  // 로그아웃 함수 (useCallback 사용)
  const handleLogout = useCallback(async () => {
    try {
      const res = await fetch("/api/login/logout", { method: "POST" });
      if (res.ok) {
        // alert("로그아웃 되었습니다.");
        router.push("/management-login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  }, [router]);

  // 그룹 토글 핸들러 (useCallback 사용)
  const toggleGroup = useCallback(
    (groupId) => {
      setUserToggledGroup((prev) => (prev === groupId ? null : groupId));
    },
    []
  );

  return (
    <div className="navbar">
      <img src="/management/image/logo_shark.png" alt="로고" />
      <Tab title="대시보드" path="dashboard" />
      <Tab title="관리자" path="manager" />
      <Tab title="유저" path="user" />
      <Group
        title="커리큘럼"
        groupId="curriculum"
        isActive={pathname.startsWith("/management/curriculum")}
        isOpen={effectiveOpenGroup === "curriculum"}
        onToggle={() => toggleGroup("curriculum")}
      >
        <GroupTab title="추천 커리큘럼" path="curriculum/recommend" />
        <GroupTab title="유저 커리큘럼" path="curriculum/user" />
      </Group>
      <Group
        title="강의 관리"
        groupId="class"
        isActive={pathname.startsWith("/management/class")}
        isOpen={effectiveOpenGroup === "class"}
        onToggle={() => toggleGroup("class")}
      >
        <GroupTab title="강의 관리" path="class/lecture" />
        <GroupTab title="강의 준비물 관리" path="class/supplies" />
      </Group>
      <Group
        title="DIMC"
        groupId="dimc"
        isActive={pathname.startsWith("/management/dimc")}
        isOpen={effectiveOpenGroup === "dimc"}
        onToggle={() => toggleGroup("dimc")}
      >
        <GroupTab title="시험 버전 관리" path="dimc/version" />
        <GroupTab title="시험 기록 관리" path="dimc/history" />
      </Group>
      <Tab title="성취도 평가" path="problem" />
      <div className="logout">
        <div>
          <p>
            {userInfo.name || ""}
            </p>
          <p>
            {userInfo.role || ""}
            </p>
        </div>
        <button type="button" onClick={handleLogout}>
          <img src="/management/image/Logout.png" alt="로그아웃" />
        </button>
      </div>
    </div>
  );
}

const Tab = React.memo(function Tab(props) {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/management/" + props.path) ? "active" : "";
  return (
    <div className="Tab">
      <Link href={`/management/${props.path}`}>
        <button className={isActive}>
          <p>▤ {props.title}</p>
        </button>
      </Link>
    </div>
  );
});

const Group = React.memo(function Group(props) {
  const { isActive, isOpen, onToggle, children } = props;
  return (
    <div className={`group-container ${isOpen ? "open" : ""} ${isActive ? "active" : ""}`}>
      <button className={`group-btn ${isActive ? "active" : ""}`} onClick={onToggle}>
        <p>▤ {props.title}</p>
        <p style={{ textAlign: "right", width: "100%" }}>{isOpen ? "-" : "+"}</p>
      </button>
      <div className={`group-content ${isOpen ? "show" : ""}`}>{children}</div>
    </div>
  );
});

const GroupTab = React.memo(function GroupTab(props) {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/management/" + props.path )? "active" : "";
  // console.log({"pathname":pathname,"true":pathname.startsWith("/management/" + props.path )})
  return (
    <div className="group-tab">
      <Link href={`/management/${props.path}`}>
        <button className={isActive} style={{ paddingLeft: "40px" }}>
          <p className={isActive}>▤ {props.title}</p>
        </button>
      </Link>
    </div>
  );
});

export default React.memo(Navbar);
