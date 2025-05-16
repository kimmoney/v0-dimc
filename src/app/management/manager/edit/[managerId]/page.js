'use client';

import { useState, useEffect } from 'react';
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
import { useRouter, useParams } from 'next/navigation';

// 환경변수 값을 배열로 변환
const managerRank = (process.env.NEXT_PUBLIC_MANAGER_RANK || "")
  .split(",")
  .map(s => s.trim());
const managerRole = (process.env.NEXT_PUBLIC_MANAGER_ROLE || "")
  .split(",")
  .map(s => s.trim());
const managerStatus = (process.env.NEXT_PUBLIC_MANAGER_STATUS || "")
.split(",")
.map(s => s.trim());

export default function ManagerEdit() {
  console.log(managerStatus)
  const router = useRouter();
  const params = useParams(); // { managerId: "..." } 형태
  const managerId = params.managerId;
  console.log('managerId:', managerId);

  // 로딩 상태와 폼 데이터 상태 설정
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    userId: '',
    password: '',
    email: '',
    rank: '',
    role: '',
    status: ''
  });

  // 컴포넌트 마운트 시 서버에서 관리자 상세 데이터를 가져와 상태 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams({ id: managerId });
    fetch(`/api/management/manager/detail?${queryParams.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return res.json();
      })
      .then((data) => {
        //전역변수로 설정
         
        const adminData = {
          name: data.admins[0].admin_name,
          phone: data.admins[0].phone_number,
          userId: data.admins[0].site_id,
          password: '', // 비밀번호는 수정 시 새로 입력
          email: data.admins[0].email,
          rank: data.admins[0].rank,
          role: data.admins[0].role,
          status: data.admins[0].status
        };
        window.adminData = adminData;
        setFormData(adminData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [managerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('phoneNumber', formData.phone);
    formDataObj.append('siteId', formData.userId);
    formDataObj.append('password', formData.password);
    formDataObj.append('email', formData.email);
    formDataObj.append('rank', formData.rank);
    formDataObj.append('role', formData.role);
    formDataObj.append('status', formData.status);
    console.log('formDataObj:', formDataObj);
    console.log("formData", formData);
    
    fetch('/api/management/manager/edit', {
      method: 'POST',
      body: formDataObj
    })
      .then((res) => {
        if (res.ok) {
          alert('관리자 수정 성공');
          router.push('/management/manager');
        } else {
          alert('관리자 수정 실패');
        }
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
    
    console.log('Form submitted:', formData);
  };
  
  const handleReset = () => {
    setFormData(adminData);
    // useEffect();
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="p-8 ">
      <h1 className="pageTitle">관리자 / 관리자 수정</h1>
      <div className="box ">
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
              value={formData.userId} // fetch 후 업데이트된 값이 표시됩니다.
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
              placeholder="아이디를 입력하세요."
              disabled={true} // 수정 불가능
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="비밀번호를 변경할 경우 입력하세요."
            />
            <p className="text-sm text-muted-foreground">
              문자+숫자 조합 8~20자리
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
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
          <div className="space-y-2">
            <Label>상태</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {managerStatus.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
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
              수정
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
