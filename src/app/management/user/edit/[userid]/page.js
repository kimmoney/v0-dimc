'use client';
// todo : handleSubmit 함수 작성
// todo : edit api 작성

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
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { type } from 'os';
import { format, formatDate } from "date-fns"
import { cn } from "@/lib/utils"
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
const dimcLevel = (process.env.NEXT_PUBLIC_DIMC_LEVEL || "")
.split(",")
.map(s => s.trim());
const userCourse = (process.env.NEXT_PUBLIC_USER_COURSE || "")
.split(",")
.map(s => s.trim());
const dimcRange = (process.env.NEXT_PUBLIC_DIMC_RANGE || "").split(",").map(s => s.trim());

export default function ManagerEdit() {
  // console.log(managerStatus)
  const router = useRouter();
  const params = useParams(); // { managerId: "..." } 형태
  const userId = params.userid;
  console.log('userId:', userId);

  // 로딩 상태와 폼 데이터 상태 설정
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({이름:'',생년월일:'',아이디:'',전화번호:'',이메일:'',교육시작학년:'',거주지역:'',연락가능시간대:'',보호자이름:'',보호자전화번호:'',보호자이메일:'',D:'',I:'',M:'',C:'',curriculum:{이름:'',시작일:'',종료일:'',종류:''}});
// 보호자이름:'',보호자전화번호:'',보호자이메일:'',D:'',I:'',M:'',C:'',curriculum:{이름:'',시작일:'',종료일:'',종류:''}});
  const [userInfo, setUserData] = useState({이름:'',생년월일:'',아이디:'',전화번호:'',이메일:'',교육시작학년:'',거주지역:'',연락가능시간대:'',보호자이름:'',보호자전화번호:'',보호자이메일:'',D:'',I:'',M:'',C:'',curriculum:{이름:'',시작일:'',종료일:'',종류:''}});
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/management/user/detail?user_id=${userId}`);
        if (!response.ok) {
          throw new Error("유저 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        console.log("data", data);
        const info = {
          이름: data.name,
          생년월일: data.birthdate,
          아이디: data.site_id,
          전화번호: data.number,
          이메일: data.email,
          보호자이름: data.parent_name,
          보호자전화번호: data.parent_number,
          보호자이메일: data.parent_email,
          교육시작학년: data.start_grade,
          거주지역: data.region,
          연락가능시간대: data.contact_time,
          D: data.d_type,
          I: data.i_type,
          M: data.m_type,
          C: data.c_type,
          curriculum:{
            이름: data.paymentHistory[0].course_type,
            시작일: data.paymentHistory[0].registration_date,
            종료일: data.paymentHistory[0].end_date,
            종류: data.paymentHistory[0].range_type,
          }
        }
        console.log("data", info);
        setFormData(info);
        setUserData(info);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      } 
    }
    fetchUserData();
    console.log("userInfo", userInfo);
  }, [userId]); // userId 변경 시 다시 실행


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    
    // const formDataObj = new FormData();
    // formDataObj.append('adminName', formData.name);
    // formDataObj.append('phoneNumber', formData.phone);
    // formDataObj.append('siteId', formData.userId);
    // formDataObj.append('password', formData.password);
    // formDataObj.append('email', formData.email);
    // formDataObj.append('rank', formData.rank);
    // formDataObj.append('role', formData.role);
    // formDataObj.append('status', formData.status);
    // console.log('formDataObj:', formDataObj);
    // console.log("formData", formData);
    
    // fetch('/api/management/manager/edit', {
    //   method: 'POST',
    //   body: formDataObj
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       alert('유저 수정 성공');
    //       router.push('/management/manager');
    //     } else {
    //       alert('유저 수정 실패');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('에러 발생:', error);
    //   });
    router.push('/management/user');
    console.log('Form submitted:', formData);
  };
  
  const handleReset = () => {
    setFormData(adminData);
    // useEffect();
  };

  // if (loading) return <div>로딩중...</div>;

  function Edit_input( {htmlFor,name, placeholder,disabled=false, type="text"} ) {
    return (
      <div className="space-y-2">
        <Label>{name}</Label>
        <Input
          id={name} // 고유한 id로 사용할 수 있습니다.
          value={formData[name]} // formData에서 해당 필드 값을 가져옵니다.
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          required
          placeholder={placeholder}
          disabled = {disabled} // 수정 불가능
          type={type}
        />
      </div>
    );
  }
  const inputList = [{name:"이름", placeholder:"이름을 입력하세요.",type:"text", disabled:true},
    {name:"생년월일", placeholder:"생년월일을 입력하세요.(YYYY-MM-DD)",type:"date",disabled:true},
    {name:"아이디", placeholder:"아이디를 입력하세요.",type:"text",disabled:true},
    {name:"전화번호", placeholder:"전화번호를 입력하세요.(01012341234)", type:"tel",pattern:"[0-9]*"},
    {name:"이메일", placeholder:"이메일을 입력하세요.",type:"email"},
    {name:"교육시작학년", placeholder:"교육시작학년을 입력하세요.",type:"number"},
    {name:"거주지역", placeholder:"거주지역을 입력하세요.",type:"text"},
    {name:"연락가능시간대", placeholder:"연락가능시간대를 입력하세요.",type:"text"},
  ];
  const parentInputList = [{name:"보호자이름", placeholder:"이름을 입력하세요.",type:"text"},
    {name:"보호자전화번호", placeholder:"전화번호를 입력하세요.(01012341234)", type:"tel",pattern:"[0-9]*"},
    {name:"보호자이메일", placeholder:"이메일을 입력하세요.",type:"email"},
  ];

  return (
    <div className="p-8">
      <h1 className="pageTitle">유저 / 유저 수정</h1>
      <Card className="box ">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 ">
          <div className="space-y-4">
          <h2 className="box-title">유저 정보 수정</h2>
          {inputList.map((input, index) => (
            <div key={index} className="space-y-2">
            <Label htmlFor={input.name}>{input.name}</Label>
            <Input
              id={index} // 고유한 id로 사용할 수 있습니다.
              value={formData[input.name]} // formData에서 해당 필드 값을 가져옵니다.
              onChange={(e) => setFormData({ ...formData, [input.name]: e.target.value })}
              required
              placeholder={input.placeholder}
              type={input.type}
              pattern={input.pattern}
              disabled = {input.disabled} // 수정 불가능
            />  
          </div>
          ))}
          <div className='box-title'>보호자 정보</div>
          {parentInputList.map((input, index) => (
            <div key={index} className="space-y-2">
            <Label htmlFor={input.name}>{input.name}</Label>
            <Input
              id={index} // 고유한 id로 사용할 수 있습니다.
              value={formData[input.name]} // formData에서 해당 필드 값을 가져옵니다.
              onChange={(e) => setFormData({ ...formData, [input.name]: e.target.value })}
              required
              placeholder={input.placeholder}
              type={input.type}
              pattern={input.pattern}
              disabled = {input.disabled} // 수정 불가능
            />



            
          </div>
          ))}
          
        
          
        </div>





        
        <div className="space-y-4">
          <div className='box-title'>DIMC 정보</div>
          {["D","I","M","C"].map((input, index) => (
            <div key={index} className="space-y-2">
                <Label>{input}</Label>
                <Select
                  value={formData[input]}
                  onValueChange={(value) => setFormData({ ...formData, [input]: value })}
                >
                <SelectTrigger>
                  <SelectValue placeholder="권한 선택" />
                </SelectTrigger>
                <SelectContent>
                  {dimcLevel.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
          ))}
          
        <div className='box-title'>커리큘럼 정보</div>
        <div className="space-y-2">
            <Label>종류</Label>
            <Select
              value={formData.curriculum.이름}
              onValueChange={(value) => setFormData({...formData, curriculum:  {...formData.curriculum, 이름: value} })}
            >
            <SelectTrigger>
              <SelectValue placeholder={formData.curriculum.이름} />
            </SelectTrigger>
            <SelectContent>
              {userCourse.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>시작일</Label>
          <Popover>
            <PopoverTrigger asChild>
              {/* <FormControl> */}
                <Button
                  variant={"outline"}
                  className={
                    "w-full pl-3 text-left font-normal"
                  }
                >
                  {formData.curriculum.시작일 ? (
                    formData.curriculum.시작일
                  ) : (
                    <span>시작 날짜를 선택하세요.</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              {/* </FormControl> */}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(formData.curriculum.시작일)}
                onSelect={(value) => {
                  // setFormData({ ...formData.curriculum, 시작일: value });
                  setFormData({ ...formData, curriculum: { ...formData.curriculum, 시작일: value.toLocaleDateString() } })

                  console.log("value", value);
                  console.log(formData)
                }}
                // disabled={(date) =>
                //   date > (new Date() )+ || date < new Date("1900-01-01")
                // }
                initialFocus

              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
            <Label>플랜</Label>
            <Select
              value={formData.curriculum.종류}
             
              onValueChange={(value) => setFormData({...formData, curriculum:  {...formData.curriculum, 종류: parseInt(value)} })}
            >
            <SelectTrigger>
              <SelectValue placeholder={formData.curriculum.종류} />
            </SelectTrigger>
            <SelectContent>
              {dimcRange.map((role) => (
                <SelectItem key={role} value={Number(role)}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>    
       


        </div>
        </form>
        <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
              초기화
            </Button>
            <Button type="submit" onClick={handleSubmit} className="flex-1">
              수정
            </Button>
          </div>
      </Card>
    </div>
  );
}
