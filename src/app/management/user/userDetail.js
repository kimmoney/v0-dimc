'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";


export function UserInfoTab(props) {
  const [userInfo, setUserData] = useState({birthdate: "", c_type: "", course_type: "", d_type: "", email: "", gender: "", i_type: "", id: "7", m_type: "", name: "", number: "", parent_email: "", parent_name: "", parent_number: "", password: "", payment_amount: "", registration_date: "", registration_session: '', site_id: "", testdate: "", user_id: ""});
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/management/user/detail?user_id=${props.userId}`);
        
        if (!response.ok) {
          throw new Error("유저 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      } 
    }
    fetchUserData();
  }, [props.userId]); // userId 변경 시 다시 실행
  return (
    <Tabs defaultValue="information" className="w-[100%] ">
    {/* // <Tabs defaultValue="payment" className="w-[100%] h-[100%]"> */}
    <div className="sticky top-0">
      <TabsList className="inline-grid w-fit grid-cols-4 " >
        <TabsTrigger value="information" >상세 정보</TabsTrigger>
        <TabsTrigger value="payment">결제 이력</TabsTrigger>
        <TabsTrigger value="dimc">DIMC</TabsTrigger>
        <TabsTrigger value="lecture">수강 이력</TabsTrigger>
      </TabsList>
    </div>
      <TabsContent value="information" >
      <div className="grid gap-4 lg:grid-cols-2">
      {/* Student and Guardian Details */}
      <Card>
        <CardHeader>
          <CardTitle>학생 상세 정보</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>이름</Label>
              <Label>{userInfo.name}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>전화번호</Label>
              <Label>{userInfo.number}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>이메일</Label>
              <Label>{userInfo.email}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>생년월일</Label>
              <Label>{userInfo.birthdate}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>성별</Label>
              <Label>{userInfo.gender}</Label>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>교육 시작 학년</Label>
              <Label>{userInfo.start_grade||"학년"}</Label>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>거주 지역</Label>
              <Label>{userInfo.region||"지역"}</Label>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>연락 가능 시간대</Label>
              <Label>{userInfo.contact_time||"18시-20시"}</Label>
            </div>
            
          </div>
          </CardContent>
        <CardHeader style={{paddingTop: "0px"}}>
          <CardTitle>보호자 상세 정보</CardTitle>
        </CardHeader>
          <CardContent className="grid gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>보호자</Label>
              <Label>{userInfo.parent_name}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>전화번호</Label>
              <Label>{userInfo.parent_number}</Label>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>이메일</Label>
              <Label>{userInfo.parent_email}</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {/* Program Information */}
        <Card>
          <CardHeader>
            <CardTitle>프로그램 정보</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>종류</Label>
                <Label>{userInfo.course_type}</Label>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>시작일</Label>
                {/* 2023-01-03T00:00:00.000Z 형태를 2023년 1월 3일 형태로*/}
                {/* <Label>{userInfo.registration_date}</Label> */}
                <Label>{userInfo.registration_date}</Label>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>만료일</Label>
                <Label>{userInfo.end_date||"2099-12-31"}</Label>
              </div>
              {/* <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>수강률</Label>
                <Label>{userInfo.progress}</Label>
              </div> */}
              {/* <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>결제 금액</Label>
                <Label>{Number(userInfo.payment_amount).toLocaleString()}원</Label>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Information */}
        <Card>
          <CardHeader>
            <CardTitle>커리큘럼 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>D</Label>
                <Label>{userInfo.d_type}</Label>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>I</Label>
                <Label>{userInfo.i_type}</Label>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>M</Label>
                <Label>{userInfo.m_type}</Label>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label>C</Label>
                <Label>{userInfo.c_type}</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      </TabsContent>
      
      
      <TabsContent value="payment" >
        <Card>
          <CardHeader>
            <CardTitle>결제 이력</CardTitle>
          </CardHeader>
        <CardContent>
          <ScrollArea className="w-full h-[312px]">
            <Table className="">
              <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>프로그램</TableHead>
                    <TableHead>기간</TableHead>
                    <TableHead>종료일</TableHead>
                    <TableHead>결제금액</TableHead>
                  </TableRow>
              </TableHeader>
              {/* tableBody 스크롤 */}
              <TableBody >
                {userInfo.paymentHistory && userInfo.paymentHistory.map((payment, index) => (
                  <TableRow key={index} className="">
                    <TableCell>{payment.registration_date}</TableCell>
                    <TableCell>{payment.course_type}</TableCell>
                    <TableCell>{payment.range_type}개월</TableCell>
                    <TableCell>{payment.end_date}</TableCell>
                    <TableCell>{Number(payment.payment_amount).toLocaleString()}원</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dimc" >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>DIMC 커리큘럼</CardTitle>
            </CardHeader>
          <CardContent>
            <ScrollArea className="w-full h-[312px]">
              <Table className="">
                <TableHeader className="sticky top-0">
                    <TableRow>
                      <TableHead>수업번호</TableHead>
                      <TableHead>난이도</TableHead>
                      <TableHead>번호</TableHead>
                      <TableHead>제목</TableHead>
                      <TableHead>주제</TableHead>
                      <TableHead>설명</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* tableBody 스크롤 */}
                  <TableBody >
                    {userInfo.dimcTest && userInfo.dimcTest.map((test, index) => (
                      <TableRow key={index} className="">
                        <TableCell>{test.testdate}</TableCell>
                        <TableCell>{test.dimc_version}</TableCell>
                        <TableCell>{test.d_score}점</TableCell>
                        <TableCell>{test.i_score}점</TableCell>
                        <TableCell>{test.m_score}점</TableCell>
                        <TableCell>{test.c_score}점</TableCell>
                        
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>DIMC 성취도 평가</CardTitle>
            </CardHeader>
          <CardContent>
            <ScrollArea className="w-full h-[312px]">
              <Table className="">
                <TableHeader className="sticky top-0">
                    <TableRow>
                      <TableHead>시험일자</TableHead>
                      <TableHead>버전</TableHead>
                      <TableHead>D</TableHead>
                      <TableHead>I</TableHead>
                      <TableHead>M</TableHead>
                      <TableHead>C</TableHead>
                      <TableHead>결과지</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* tableBody 스크롤 */}
                  <TableBody >
                  {userInfo.dimcTest && userInfo.dimcTest.map((test, index) => (
                      <TableRow key={index} className="">
                        <TableCell>{test.testdate}</TableCell>
                        <TableCell>{test.dimc_version}</TableCell>
                        <TableCell>{test.d_score}점</TableCell>
                        <TableCell>{test.i_score}점</TableCell>
                        <TableCell>{test.m_score}점</TableCell>
                        <TableCell>{test.c_score}점</TableCell>
                        <TableCell><Button >다운</Button></TableCell>
                        
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="lecture">
      <Card>
          <CardHeader>
            <CardTitle>수강 이력</CardTitle>
          </CardHeader>
        <CardContent>
          <ScrollArea className="w-full h-[312px]">
            <Table className="">
              <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>수업 번호</TableHead>
                    <TableHead>커리큘럼</TableHead>
                    <TableHead>수강여부</TableHead>
                    <TableHead>담당 교강사</TableHead>
                  </TableRow>
                </TableHeader>
                {/* tableBody 스크롤 */}
                <TableBody >
                  {userInfo.dimcTest && userInfo.dimcTest.map((test, index) => (
                    <TableRow key={index} className="">
                      <TableCell>{test.testdate}</TableCell>
                      <TableCell>{test.dimc_version}</TableCell>
                      <TableCell>{test.d_score}점</TableCell>
                      <TableCell>{test.i_score}점</TableCell>
                      <TableCell>{test.m_score}점</TableCell>
                      
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
