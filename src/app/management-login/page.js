'use client';
import { Loader2 } from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import './login.css';
import Image from 'next/image';


export default function Dashboard() {
  console.log(process.env.DB_HOST);
  const [id, setId] = useState("");       // 아이디 상태
  const [pw, setPw] = useState("");       // 비밀번호 상태
  const [error, setError] = useState(""); // 오류 메시지 상태
  const router = useRouter();             // Next.js 라우터
  const [loginButton,setloginButton] = useState(false)

  const handleSubmit = async (e) => {
    setloginButton(true)
    e.preventDefault();

    // Credentials Provider를 사용하여 로그인 요청
    const result = await signIn("credentials", {
      redirect: false, // 자동 리디렉션 대신 결과를 직접 처리
      site_id: id,
      password: pw,
    });
    console.log("로그인 결과:", result);
    if (result.error) {
      setError("로그인에 실패하였습니다.");
      setloginButton(false);
    }
    if (result.ok) {
      console.log("로그인 성공:", result);
      router.push("/management/dashboard");
    }
    // try {
    //   const res = await fetch("../api/management/login/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include", // 쿠키 포함
    //     body: JSON.stringify({ siteId: id, password: pw }),
    //   });

    //   if (res.ok) {
    //     const userInfo = await res.json();
    //     console.log(userInfo);
      
    //   }
    // //     const userInfo = await res.json();
    // //     localStorage.setItem("userInfo", JSON.stringify(userInfo.userInfo));
    // //     router.push("/management");
    // //   } else {
    // //     const data = await res.json();
    // //     setError(data.message || "로그인에 실패하였습니다.");
    // //   }
    // } catch (error) {
    //   console.error("로그인 에러:", error);
    //   setError("로그인 도중 오류가 발생했습니다.");
    // }
    setloginButton(false);
  };
  return (    
    <div className="login-container">
      <Image
        src="/assets/logo/logo.png"
        alt="SHARK Digital Literacy Educate"
        className="logo"
        width={300}
        height={100}
      />

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          {error && <label className="error-message">{error}</label>}
        </div>
        
        <Button disabled={loginButton} type="submit" className="login-button">
          {loginButton && <Loader2 aria-hidden={false} className="animate-spin" />}
          로그인
        </Button>
        
        <label className="help-text">
          아이디 / 비밀번호를 분실하셨을 경우 관리자에게 문의하세요.
        </label>
      </form>
    </div>
  );
}
function Dashboardsd() {
  const [id, setId] = useState("");       // 아이디 상태
  const [pw, setPw] = useState("");       // 비밀번호 상태
  const [error, setError] = useState(""); // 오류 메시지 상태
  const router = useRouter();             // Next.js 라우터
  const [loginButton,setloginButton] = useState(false)
  const handleSubmit = async (e) => {
    setloginButton(true)
    e.preventDefault();

    try {
      const res = await fetch("/api/management/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 쿠키 포함
        body: JSON.stringify({ siteId: id, password: pw }),
      });

      if (res.ok) {
        // API에서 세션 쿠키를 설정했으므로,
        // 이후 요청부터는 쿠키를 통해 인증 상태가 유지됩니다.
        const userInfo = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(userInfo.userInfo));
        router.push("/management");
        // setTimeout(() => {
        //   router.push("/management");
        // }, 200);
      } else {
        const data = await res.json();
        setError(data.message || "로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setError("로그인 도중 오류가 발생했습니다.");
    }
    setloginButton(false)
  };

  return (    
    <div className="login-container">
      <img
        src="/management/image/logo_shark.png"
        alt="SHARK Digital Literacy Educate"
        className="logo"
      />

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          {error && <label className="error-message">{error}</label>}
        </div>
        
        <Button disabled={loginButton} type="submit" className="login-button">
          {loginButton && <Loader2 aria-hidden={false} className="animate-spin" />}
          로그인
        </Button>
        
        <label className="help-text">
          아이디 / 비밀번호를 분실하셨을 경우 관리자에게 문의하세요.
        </label>
      </form>
    </div>
  );
}
