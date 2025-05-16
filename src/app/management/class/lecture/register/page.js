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
      id: 30,
      class_number: "",
      title: "",
      competency_dimc: "D",
      difficulty: "공통",
      lecture_time: 0,
      lecture_topic: "",
      lecture_description: "",
      prerequisite: "",
      syllabus: "",
      items: []
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
    fetch('/api/management/class/lecture/register', {
      method: 'POST',
      body: formDataObj
    })
      .then((res) => {
        if (res.ok) {
          alert('강의 정보 등록 성공');
          router.push('/management/class/lecture');
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
      <h1 className="pageTitle">강의 / 기존 강의 등록</h1>
      <Card className="box ">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 ">
          <div className="space-y-4">
            <h2 className="box-title">강의 정보</h2>
              <div className="space-y-2">
                <Label htmlFor="lecture_number">수업 번호</Label>
                <Input
                  id="lecture_number"
                  value={class_id}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="lecture_title"
                  value={formData.title||""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="class_number">수업번호</Label>
                <Input
                  id="class_number"
                  value={formData.class_number||""}
                  onChange={(e) => setFormData({ ...formData, class_number: e.target.value })}
                  required
                />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competency_dimc">역량(DIMC)</Label>
                  <Select
                    value={formData?.competency_dimc}
                    onValueChange={(value) => {
                      if (value != "") {
                        setFormData({ ...formData, competency_dimc: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData?.competency_dimc || "D"} />
                    </SelectTrigger>
                    <SelectContent>
                      {['D','I','M','C'].map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">난이도(공통, 기초, 중급, 심화)</Label>
                  <Select
                    value={formData?.difficulty}
                    onValueChange={(value) => {
                      if (value != "") {
                        setFormData({ ...formData, difficulty: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData?.difficulty || "심화"} />
                    </SelectTrigger>
                    <SelectContent>
                      {dimcLevel.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="lecture_time">시수</Label>
                <Input
                  id="lecture_time"
                  value={formData.lecture_time||""}
                  onChange={(e) => setFormData({ ...formData, lecture_time: e.target.value })}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="lecture_topic">주제</Label>
                <Input
                  id="lecture_topic"
                  value={formData.lecture_topic||""}
                  onChange={(e) => setFormData({ ...formData, lecture_topic: e.target.value })}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="lecture_description">설명</Label>
                <Input
                  id="lecture_description"
                  value={formData.lecture_description||""}
                  onChange={(e) => setFormData({ ...formData, lecture_description: e.target.value })}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisite">선수과목</Label>
                <Input
                  id="prerequisite"
                  value={formData.prerequisite||""}
                  onChange={(e) => setFormData({ ...formData, prerequisite: e.target.value })}
                  required
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="syllabus">강의 계획안</Label>
                <Input
                  id="syllabus"
                  value={formData.syllabus||""}
                  // type="file"
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  required
                />
                </div>
          </div>


        
        <div className="space-y-4 ">
          <p className='box-title'>강의 준비물</p>
          <div className="w-full">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="grid grid-cols-5 gap-4">
                  <TableHead className="py-3">ID</TableHead>
                  <TableHead className="py-3">이름</TableHead>
                  <TableHead className="py-3">금액</TableHead>
                  <TableHead className="py-3">개수</TableHead>
                  <TableHead className="py-3">기타 정보</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="block h-[280px] overflow-auto">
                {/* <ScrollArea className="h-[280px]"> */}
                  {LectureItems.map((item, index) => (
                      <TableRow key={index} className="grid grid-cols-5 gap-4" 
                        onClick={() => setCurrentItem(index)}
                        style={{backgroundColor: CurrentItem === index ? 'lightgray' : 'white'}}
                      >
                        <TableCell className="py-3 truncate">{item.supply_id}</TableCell>
                        <TableCell className="py-3 truncate">{item.name}</TableCell>
                        <TableCell className="py-3 truncate">{Number(item.price).toLocaleString('ko-KR')}</TableCell>
                        <TableCell className="py-3 truncate">{Number(item.quantity).toLocaleString('ko-KR')}</TableCell>
                        <TableCell className="py-3 truncate">{item.additional_info}</TableCell>
                      </TableRow>
                    ))}
                {/* </ScrollArea> */}
              </TableBody>
            </Table>
          </div>
          {/* 오른쪽 정렬 */}
        <div className="flex justify-end space-x-2 items-end">
          <Button type="button" variant="outline" className="flex-1 max-w-[100px]" 
            onClick={() => {
              const newItem = {supply_id: LectureItems.length+1, name: '', price: 0, quantity: 0,additional_info:''};
              setCurrentItem(LectureItems.length);
              setLectureItems([...LectureItems, newItem]);
            }}>
            추가
          </Button>
          <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">불러오기</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when yoe done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          <Button type="button" variant="outline" className="flex-1 max-w-[100px]"
            onClick={() => {
              setLectureItems(LectureItems.filter((_, index) => index !== CurrentItem));
              if (CurrentItem === 0) return;
              setCurrentItem(CurrentItem-1);
            }}
            disabled={LectureItems.length === 0}>
            삭제
          </Button>
        </div>

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
