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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { type } from 'os';
import { format, formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const class_id = params.lectureId;

  // 로딩 상태와 폼 데이터 상태 설정
  const [formData, setFormData] = useState({difficulty: "심화", competency_dimc: "I"});
  const [OriginalResult, setOriginalResult] = useState({});
  const [LectureItems, setLectureItems] = useState([]);
  const [CurrentItem, setCurrentItem] = useState(0);


  useEffect(() => {
    const result = {
      id: 1231,
      class_number: "",
      title: "",
      competency_dimc: "D",
      difficulty: "공통",
      lecture_time: 1,
      lecture_topic: "",
      lecture_description: "",
      prerequisite: "",
      syllabus: "",
      items: [
        {supply_id:11323, name:'', price:"", quantity:1, additional_info:""},
      ]
    }
    setOriginalResult(result);
    setLectureItems(result.items);
    // reuslt에서 items를 빼고 formData에 넣어줍니다.
    const widthOutItems = { ...result };
    delete widthOutItems.items;
    setFormData(widthOutItems);
  }, []); // 빈 배열을 넣으면 페이지가 열릴 때 한 번 실행됩니다.

  // useEffect(() => {
  //   if (OriginalResult && OriginalResult.items) {
  //     setFormData(OriginalResult);
  //     setLectureItems(OriginalResult.items);
  //   }
  // }, [OriginalResult]);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('class_number', formData.class_number);
    formDataObj.append('title', formData.title);
    formDataObj.append('competency_dimc', formData.competency_dimc);
    formDataObj.append('difficulty', formData.difficulty);
    formDataObj.append('lecture_time', formData.lecture_time);
    formDataObj.append('lecture_topic', formData.lecture_topic);
    formDataObj.append('lecture_description', formData.lecture_description);
    formDataObj.append('prerequisite', formData.prerequisite);
    formDataObj.append('syllabus', formData.syllabus);
    formDataObj.append('items', JSON.stringify(LectureItems));
    fetch('/api/management/class/supplies/register', {
        // /api/management/class/supplies/register
      method: 'POST',
      body: formDataObj
    })
      .then((res) => {
        if (res.ok) {
          alert('강의 정보 등록 성공');
          router.push('/management/class/supplies');
        } else {
          alert('강의 정보 등록 실패');
        }
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };
  
  const handleReset = () => {
    
    setFormData(OriginalResult);
    setLectureItems(OriginalResult.items);
    setCurrentItem(0);
    // useEffect();
  };

  // if (loading) return <div>로딩중...</div>;


  return (
    <div className="p-8">
      <title>Shark 관리페이지 | 물품 정보 등록</title> 

      <h1 className="pageTitle">강의 / 물품 정보 등록</h1>
      <Card className="box ">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 ">
          <div className="space-y-4">

        <div className='box-title'>준비물 정보</div>
        {/* <div className="space-y-2"
            <Label>{JSON.stringify(LectureItems[CurrentItem]||"")}</Label>
            <Label>{JSON.stringify(formData||"")}</Label>
            
        </div>> */}
        <div className="space-y-2">
          <Label>아이템 ID</Label>
          <div className="flex">
          <Input 
              value={LectureItems[CurrentItem]?.supply_id || ""}
              onChange={(e) => {
                const updatedItems = LectureItems.map((item, index) =>
                  index === CurrentItem ? { ...item, supply_id: e.target.value } : item
                );
                setLectureItems(updatedItems);
              }}
              required
              disabled
            />
            
          </div>
          <Label>이름</Label>
          <Input 
            value={LectureItems[CurrentItem]?.name||""}
            onChange={(e) => {
              const updatedLectureItems = LectureItems.map((item, index) => 
                index === CurrentItem ? { ...item, name: e.target.value } : item
              );
              setLectureItems(updatedLectureItems);
            }}
          />
          <Label>수량</Label>
          <Input
            value={Number(LectureItems[CurrentItem]?.quantity).toLocaleString('ko-KR')||""}
            onChange={(e) => {
              // 모든 콤마 제거 후 숫자 변환
              const rawValue = e.target.value.replace(/,/g, "");
              // 빈 문자열 처리: 빈 문자열이면 0 또는 그냥 빈 문자열로 둘 수도 있습니다.
              const numericValue = rawValue === "" ? "" : Number(rawValue);
              
              // 숫자인지 확인 (빈 문자열일 경우도 허용)
              if (rawValue === "" || !isNaN(numericValue)) {
                const updatedLectureItems = LectureItems.map((item, index) =>
                  index === CurrentItem
                    ? { ...item, quantity: numericValue }
                    : item
                );
                setLectureItems(updatedLectureItems);
              }
            }}
            />
          <Label>금액</Label>
          <Input
            value={Number(LectureItems[CurrentItem]?.price).toLocaleString('ko-KR')||""}
            onChange={(e) => {
              // 모든 콤마 제거 후 숫자 변환
              const rawValue = e.target.value.replace(/,/g, "");
              // 빈 문자열 처리: 빈 문자열이면 0 또는 그냥 빈 문자열로 둘 수도 있습니다.
              const numericValue = rawValue === "" ? "" : Number(rawValue);
              
              // 숫자인지 확인 (빈 문자열일 경우도 허용)
              if (rawValue === "" || !isNaN(numericValue)) {
                const updatedLectureItems = LectureItems.map((item, index) =>
                  index === CurrentItem
                    ? { ...item, price: numericValue }
                    : item
                );
                setLectureItems(updatedLectureItems);
              }
            }}
          />
          {/* <Label>아이팀 ID</Label> */}
          </div>
          <div className="space-y-2">
            <Label>기타 정보</Label>
            <Input
              value={LectureItems[CurrentItem]?.additional_info||""}
              onChange={(e) => {
                const updatedLectureItems = LectureItems.map((item, index) =>
                  index === CurrentItem ? { ...item, additional_info: e.target.value } : item
                );
                setLectureItems(updatedLectureItems);
              }}
            />


          </div>
        </div>
        </form>
        <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
              초기화
            </Button>
            <Button type="submit" onClick={handleSubmit} className="flex-1">
              등록
            </Button>
          </div>
      </Card>
    </div>
  );
}
