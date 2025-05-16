// app/login/page.js (Next.js App Router 사용)
import { redirect } from "next/navigation";

export default function LoginPage() {
    redirect("/management/class/lecture"); // 강제 리다이렉트
    return null; // 렌더링하지 않음
}