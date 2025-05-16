'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

// 환경변수 값이 문자열로 주입됨 (예: "대표,사원,개발자")
// 이를 배열로 변환합니다.
const managerRank = (process.env.NEXT_PUBLIC_MANAGER_RANK || "").split(",").map(s => s.trim());
const managerRole = (process.env.NEXT_PUBLIC_MANAGER_ROLE || "").split(",").map(s => s.trim());
export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    userId: '',
    password: '',
    email:'',
    rank: '',
    role: ''
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FormData 객체 생성
    const formDataObj = new FormData();
    formDataObj.append('adminName', formData.name);
    formDataObj.append('phoneNumber', formData.phone);
    formDataObj.append('siteId', formData.userId);
    formDataObj.append('password', formData.password);
    formDataObj.append('email', formData.email);
    formDataObj.append('rank', formData.rank);
    formDataObj.append('role', formData.role);
    
    fetch('/api/management/manager/register', {
      method: 'POST',
      body: formDataObj
    })
    .then((res) => {
      if (res.ok) {
        alert('관리자 추가 성공');
        // 페이지 이동
        router.push('/management/manager');
      } else {
        alert('관리자 추가 실패');
      }
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
    
    console.log('Form submitted:', formData);
  };
  

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      userId: '',
      password: '',
      rank: '',
      role: ''
    });
  };

  return (
    <div className="p-8">
      <h1 className="pageTitle">관리자 / 관리자 추가</h1>
      <div className="box">
        <form onSubmit={handleSubmit} className="space-y-4" style={{ maxWidth: "50%" }}>
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="이름을 입력하세요."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              pattern="[0-9]*"
              placeholder="숫자만 입력하세요."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">아이디</Label>
            <Input
              id="userId"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
              placeholder="아이디를 입력하세요."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="비밀번호를 입력하세요."
            />
            <p className="text-sm text-muted-foreground">
              문자+숫자 조합 8~20자리
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="userId">이메일</Label>
            <Input
              id="userId"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="이메일을 입력하세요."
            />
          </div>
          <div className="space-y-2">
            <Label>직책</Label>
            <Select
              value={formData.rank}
              onValueChange={(value) => setFormData({ ...formData, rank: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="직책 선택" />
              </SelectTrigger>
              <SelectContent>
                {managerRank.map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>권한</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="권한 선택" />
              </SelectTrigger>
              <SelectContent>
                {managerRole.map((role) => (
                    <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
              초기화
            </Button>
            <Button type="submit" className="flex-1">
              추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
