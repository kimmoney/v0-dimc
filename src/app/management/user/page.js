'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import {
  Pagination, 
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenuCheckboxItemProps } from "@/components/ui/dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { UserInfoTab } from "./userDetail";
import Head from 'next/head'
import { join } from 'path'
import { Label } from '@radix-ui/react-dropdown-menu'
import { SelectIcon } from '@radix-ui/react-select'
export default function AdminPage() {

  // const managerRank = (process.env.NEXT_PUBLIC_MANAGER_RANK || "").split(",").map(s => s.trim());
  // const managerRole = (process.env.NEXT_PUBLIC_MANAGER_ROLE || "").split(",").map(s => s.trim());
  const userGender = (process.env.NEXT_PUBLIC_USER_GENDER || "").split(",").map(s => s.trim());
  const userCource = (process.env.NEXT_PUBLIC_USER_COURSE || "").split(",").map(s => s.trim());
  const router = useRouter();
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [filters, setFilters] = useState({
    name: '',
    userId: '',
    number: '',
    course_type: ' ',
    gender: ' ',
    status: ' ',
    min_age: '',
    max_age: '',
    dimc:{D:{기초:false, 중급:false, 심화:false}, I:{기초:false, 중급:false, 심화:false}, M:{기초:false, 중급:false, 심화:false}, C:{기초:false, 중급:false, 심화:false}}
  })

  const [userList, setUserList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // 필터 값이 바뀔 때마다 현재 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // 유저 목록 불러오기
  const fetchAdmins = async () => {
    setLoading(true)
    console.log('fetchAdmins 호출됨')
    try {
      const params = new URLSearchParams({
        limit: '10',
        page: currentPage.toString(),
        name: filters.name,
        userId: filters.userId,
        number: filters.number,
        course_type: filters.course_type,
        min_age: filters.min_age,
        max_age: filters.max_age,
        gender: filters.gender,
        status: filters.status,
        // dimc: filters.dimc
        dimc : JSON.stringify({D:filteredDimc('D'), I:filteredDimc('I'), M:filteredDimc('M'), C:filteredDimc('C')})
      })
      console.log('파라미터:', params.toString())

      const res = await fetch(`/api/management/user/search?${params.toString()}`);

      if (res.ok) {
        const data = await res.json()
        // console.log(data)
        // data.users: 유저 목록, data.totalPages: 전체 페이지 수
        setUserList(data.users)
        setTotalPages(data.totalPages)
      } else {
        console.error('유저 데이터를 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.error('에러:', error)
    } finally {
      setLoading(false)
    }
  }

  // 필터나 페이지가 변경될 때마다 유저 목록 재호출 및 선택 초기화
  useEffect(() => {
    fetchAdmins()
    setSelectedAdmin(null)
  }, [filters, currentPage])

  const handleReset = () => {
    setFilters({
      name: '',
      userId: '',
      number: '',
      course_type: ' ',
      gender: ' ',
      status: ' ',
      min_age: '',
      max_age: '',
      dimc:{D:{기초:false, 중급:false, 심화:false}, I:{기초:false, 중급:false, 심화:false}, M:{기초:false, 중급:false, 심화:false}, C:{기초:false, 중급:false, 심화:false}}
    })
    setCurrentPage(1)
  }

  const handleDelete = () => {
    if (selectedAdmin && confirm('선택한 유저를 삭제하시겠습니까?')) {
      console.log('삭제할 유저:', selectedAdmin)
      fetch(`/api/management/user/delete?id=${selectedAdmin.id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            console.log('삭제 성공')
            fetchAdmins()
          } else {
            console.error('삭제 실패')
          }
        })
        .catch((error) => {
          console.error('삭제 중 오류:', error)
        })
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 유저 테이블 행 컴포넌트
  // 클릭 시 해당 행이 선택(토글)되며, 선택된 행 아래에 추가 상세 정보 행이 나타납니다.
  const AdminTableRow = ({ user }) => {
    const isSelected = selectedAdmin?.user_id === user.user_id
    const handleRowClick = () => {
      setSelectedAdmin(isSelected ? null : user)
    }
    return (
      <>
      <TableRow
        className={`cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
        onClick={handleRowClick}
      >
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.site_id}</TableCell>
        <TableCell>{user.number}</TableCell>
        <TableCell>{user.d_type}</TableCell>
        <TableCell>{user.i_type}</TableCell>
        <TableCell>{user.m_type}</TableCell>
        <TableCell>{user.c_type}</TableCell>
        <TableCell>{user.gender}</TableCell>
        <TableCell>1학년</TableCell>
        <TableCell>인천</TableCell>
        <TableCell>18시-22시</TableCell>
        <TableCell>{user.course_type}</TableCell>
      </TableRow>
      {isSelected && (
        <TableRow>
        <TableCell colSpan={12} className="p-0">
          <div className="p-4 bg-gray-50 transition-all duration-300" style={{ padding:"15px",margin: '0px', maxHeight: '550px', overflowY: 'auto' }} >
          <UserInfoTab userId={user.user_id} user_info={user} />
          </div>
        </TableCell>
        </TableRow>
      )}
      </>
    )
  }

  // 전체 페이지 번호 배열 생성
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  // const [dimcFilter, setDimcFilter] = useState({D:{기초:false, 중급:false, 심화:false}, I:{기초:false, 중급:false, 심화:false}, M:{기초:false, 중급:false, 심화:false}, C:{기초:false, 중급:false, 심화:false}})
  const checkDimc = (dimc,type) => {
    const filtersCopy = {...filters}
    filtersCopy.dimc[type][dimc] = !filtersCopy.dimc[type][dimc]
    setFilters(filtersCopy)
  }
  //dimcFilter['D']의 true인 것만 필터링 해서 출력
  function filteredDimc(type){
    let result = ''
    for (const [key, value] of Object.entries(filters.dimc[type])) {
      if(value){
        result += key + ', '
      }
    }
    if(result.length > 0){
      result = " : " + result.slice(0, -2)
    return result
    }
  }
  return (
    <div className="p-8">
      <title>Shark 관리페이지 | 유저</title> 
      <h1 className="pageTitle">유저</h1>

      {/* 검색 필터 */}
      <Card className="box">
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-4">
          <Input
            placeholder="이름"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          {/* <Input
            placeholder="아이디"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          /> */}
          <Input
            placeholder="전화번호"
            value={filters.number}
            onChange={(e) => setFilters({ ...filters, number: e.target.value })}
          />
          <Select
            value={filters.gender}
            onValueChange={(value) => setFilters({ ...filters, gender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="성별" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">성별</SelectItem>
              {userGender.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.course_type}
            onValueChange={(value) => setFilters({ ...filters, course_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="프로그램" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">프로그램</SelectItem>
              {userCource.map((course_type) => (
                <SelectItem key={course_type} value={course_type}>{course_type}</SelectItem> 
              ))}
            </SelectContent>
          </Select>
          {/* 2칸 사용 */}
          <div className="flex items-center w-full  gap-4">
          {Object.keys(filters.dimc).slice(0, 2).map((dimc,index) => (
              <DropdownMenu key={dimc}>
                <><DropdownMenuTrigger asChild>
                  {/* True인 항목들 텍스트로 연결해서  */}
                  <Button variant="outline" className='w-full'>{dimc} {filteredDimc(dimc)}</Button>
                </DropdownMenuTrigger><DropdownMenuContent className="w-56">
                    {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["기초"]}
                      onCheckedChange={() => checkDimc('기초', dimc)}
                    >
                      기초
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["중급"]}
                      onCheckedChange={() => checkDimc('중급', dimc)}
                    >
                      중급
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["심화"]}
                      onCheckedChange={() => checkDimc('심화', dimc)}
                    >
                      심화
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent></>
                </DropdownMenu>
                
              ))}
          </div>
          <div className="flex items-center w-full  gap-4">
          {Object.keys(filters.dimc).slice(2, 4).map((dimc,index) => (
              <DropdownMenu key={dimc}>
                <><DropdownMenuTrigger asChild>
                  {/* True인 항목들 텍스트로 연결해서  */}
                  <Button variant="outline" className='w-full'>{dimc} {filteredDimc(dimc)}</Button>
                </DropdownMenuTrigger><DropdownMenuContent className="w-56">
                    {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["기초"]}
                      onCheckedChange={() => checkDimc('기초', dimc)}
                    >
                      기초
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["중급"]}
                      onCheckedChange={() => checkDimc('중급', dimc)}
                    >
                      중급
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dimc[dimc]["심화"]}
                      onCheckedChange={() => checkDimc('심화', dimc)}
                    >
                      심화
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent></>
                </DropdownMenu>
                
              ))}
          </div>
          {/* 내부 아이템 폭을 최소화 */}
          <div>
            <div className="flex gap-4 w-fit-content ">
            <Select  style={{width: "1px"}}
                value={filters.min_age}
                onValueChange={(value) => setFilters({ ...filters, min_age: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="최소 나이" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value=" ">최소 나이</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="13">13</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="17">17</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                  <SelectItem value="19">19</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              <h3 className='grid place-items-center '>~</h3>
              <Select
                value={filters.max_age}
                onValueChange={(value) => setFilters({ ...filters, max_age: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="최대 나이" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">최대 나이</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="13">13</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="17">17</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                  <SelectItem value="19">19</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <p/> */}
          <Button onClick={handleReset}>초기화</Button>
        </div>
      </Card>

      {/* 유저 관리 버튼 및 테이블 */}
      <Card className="box flex flex-col min-h-screen" style={{ minHeight: "580px" }}>
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            disabled={!selectedAdmin}
            onClick={() => router.push(`/management/user/edit/${selectedAdmin?.user_id}`)}
          >
            수정
          </Button>
          <Button variant="destructive" disabled={!selectedAdmin} onClick={handleDelete}>
            삭제
          </Button>
        </div>

        {!loading && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>아이디</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>D</TableHead>
                <TableHead>I</TableHead>
                <TableHead>M</TableHead>
                <TableHead>C</TableHead>
                <TableHead>성별</TableHead>
                <TableHead>교육 시작</TableHead>
                <TableHead>거주지역</TableHead>
                <TableHead>연락가능 시간대</TableHead>
                <TableHead>프로그램</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.length > 0 ? (
                userList.map((user) => (
                  <AdminTableRow key={user.user_id} user={user} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12}>데이터가 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* 페이지네이션 */}
        <div className="mt-auto flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                />
              </PaginationItem>
              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  )
}
