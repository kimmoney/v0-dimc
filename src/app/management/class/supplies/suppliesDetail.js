/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Button } from "@/components/ui/button";
import {  Card,  CardContent,  CardHeader,  CardTitle,} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {  Tabs,  TabsContent,  TabsList,  TabsTrigger,} from "@/components/ui/tabs";
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Item } from "@radix-ui/react-dropdown-menu";


export function LectureInfoTab(props) {
  const [lectureInfo, setlectureData] = useState({birthdate: "", c_type: "", course_type: "", d_type: "", email: "", gender: "", i_type: "", id: "7", m_type: "", name: "", number: "", parent_email: "", parent_name: "", parent_number: "", password: "", items_amount: "", registration_date: "", registration_session: '', site_id: "", testdate: "", lecture_id: ""});
  const [selectedItem, setSelectedItem] = useState(null)
  const [ItemImage,setItemImage] = useState("/assets/logo/dimcSymbol.png")
  
  console.log(props);


  const ItemTableRow = ({ items }) => {
    // console.log(lecture)
    const isSelected = selectedItem?.id === items.id
    const handleRowClick = () => {
      setSelectedItem(isSelected ? null : items)
    }
    return (
      <>
      <TableRow
        className={`cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
        onClick={handleRowClick}
      >
        <TableCell>{items.supply_id}</TableCell>
        <TableCell>{items.item_name}</TableCell>
        <TableCell>{items.quantity}</TableCell>
        <TableCell>{items.additional_info}</TableCell>
        <TableCell>{items.Description}</TableCell>
  
        
      </TableRow>
      </>
    )
  }
  useEffect(() => {
    async function fetchlectureData() {
      try {
        // console.log(props)
        const response = await fetch(`/api/management/class/lecture/detail?id=${props.lectureId}`);
        if (!response.ok) {
          throw new Error("유저 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setlectureData(data);
        console.log(data);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      } 
    }
    fetchlectureData();
  }, [props.lectureId]); // lectureId 변경 시 다시 실행

  useEffect(() => {
    if (selectedItem){
    console.log(selectedItem);
    setItemImage("/picture/lectureItems/lectureItem_"+selectedItem?.id+".jpg")
    console.log("/picture/lectureItems/lectureItem_"+selectedItem?.id+".jpg")
    }
  },[selectedItem])




  return (
    <Tabs defaultValue="information" className="w-[100%] ">
    {/* // <Tabs defaultValue="items" className="w-[100%] h-[100%]"> */}
    <div className="sticky top-0">
      <TabsList className="inline-grid w-fit grid-cols-4 " >
        <TabsTrigger value="information" >요약 정보</TabsTrigger>
        <TabsTrigger value="informationDetail">세부정보</TabsTrigger>
        <TabsTrigger value="syllabus">강의계획안</TabsTrigger>
        <TabsTrigger value="lectureItem">강의 아이템</TabsTrigger>
      </TabsList>
    </div>
      <TabsContent value="information" >
      <div className="grid gap-4 lg:grid-cols-2">
      {/* Student and Guardian Details */}
      <Card>
        <CardHeader>
          <CardTitle>수업 상세 정보</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="space-y-4">
            <div
              className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>제목</Label>
              <Label>{lectureInfo.lecture_title}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>주제</Label>
              <Label>{lectureInfo.lecture_topic}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>수업번호</Label>
              <Label>{lectureInfo.class_number}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>역량(DIMC)</Label>
              <Label>{lectureInfo.competency_dimc}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>난이도</Label>
              <Label>{lectureInfo.difficulty}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>번호</Label>
              <Label>{lectureInfo.lecture_number}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>시수</Label>
              <Label>{lectureInfo.lecture_time}</Label>
            </div>
          </div>
          </CardContent>
        </Card>
      <div className="space-y-4"> 
        <Card className="h-[100%]">
          <CardHeader>
            <CardTitle>강의 계획안</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
          <Label>{lectureInfo.syllabus}</Label>
          </CardContent>
        </Card>
      </div>
    </div>
      </TabsContent>
      
      <TabsContent value="lectureItem" >
        <Card>
          <CardHeader>
            <CardTitle>강의 아이템</CardTitle>
          </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
          <ScrollArea className="w-full h-[312px]">
            <Table className="">
              <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>수량</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>기타 정보</TableHead>
                  </TableRow>
                </TableHeader>
                {/* tableBody 스크롤 */}
                <TableBody >
                  {lectureInfo.items && lectureInfo.items.map((items, index) => (
                    // <TableRow key={index} className="">
                      <ItemTableRow key={index} items={items} />
                    //   <TableCell>{}</TableCell>
                    // </TableRow>
                  ))}
              </TableBody>
            </Table>
            </ScrollArea>
            {/* <Image src={ItemImage} alt="lectureItem" className="w-auto" width={300} height={300}/> */}
            <img src={ItemImage} alt="lectureItem" className="w-auto h-[300px]"/>
          </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="informationDetail" >
        <Card>
          <CardHeader>
            <CardTitle>제목</CardTitle>
          </CardHeader>
        <CardContent>
            <Label>{lectureInfo.lecture_title}</Label>
          </CardContent>
          <CardHeader>
            <CardTitle>주제</CardTitle>
          </CardHeader>
        <CardContent>

            <Label>{lectureInfo.lecture_title}</Label>
          </CardContent>
          <CardHeader>
            <CardTitle>설명</CardTitle>
          </CardHeader>
        <CardContent>
            <Label>{lectureInfo.lecture_description}</Label>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="syllabus">
      <Card>
          <CardHeader>
            <CardTitle>강의 계획안</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
          <Label>{lectureInfo.syllabus}</Label>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
