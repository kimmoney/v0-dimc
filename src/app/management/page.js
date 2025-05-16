import { redirect } from "next/navigation";

export default function Dashboard() {
    redirect("/management/dashboard"); // 강제 리다이렉트
    return null; // 렌더링하지 않음
}