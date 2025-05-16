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
import { LectureInfoTab } from "./suppliesDetail";
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
      id: '',
      item_name: '',
      description: '',
      page: 1,
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
        id: filters.id,
        item_name: filters.item_name,
        description: filters.description,
        page: currentPage,
            })
      console.log('파라미터:', params.toString())

      const res = await fetch(`/api/management/class/supplies/search?${params.toString()}`);

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        // data.users: 유저 목록, data.totalPages: 전체 페이지 수
        setUserList(data.lectures)
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
      id: '',
      item_name: '',
      description: '',
      page: 1,
    })
    setCurrentPage(1)
  }

  const handleDelete = () => {
    if (selectedAdmin && confirm('선택한 유저를 삭제하시겠습니까?')) {
      console.log('삭제할 유저:', selectedAdmin)
      fetch(`/api/management/class/supplies/delete?id=${selectedAdmin.id}`, {
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
  const LectureTableRow = ({ lecture }) => {
    // console.log(lecture)
    const isSelected = selectedAdmin?.id === lecture.id
    const handleRowClick = () => {
      setSelectedAdmin(isSelected ? null : lecture)
    }
    return (
      <>
      <TableRow
        className={`cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
        onClick={handleRowClick}
      >
        {/* <TableCell>{lecture.class_number}</TableCell> 
        <TableCell>{lecture.competency_dimc}</TableCell>
        <TableCell>{lecture.difficulty}</TableCell>
        <TableCell>{lecture.lecture_number}</TableCell>
        <TableCell>{lecture.lecture_time}</TableCell>
        <TableCell>{lecture.lecture_title}</TableCell>
        <TableCell>{lecture.lecture_topic}</TableCell>
        <TableCell>{lecture.lecture_description}</TableCell>
        <TableCell>{lecture.prerequisite}</TableCell>
        <TableCell>{lecture.syllabus}</TableCell> */}
        <TableCell>{lecture.id}</TableCell>
        <TableCell>{lecture.item_name}</TableCell>
        <TableCell>{lecture.quantity}</TableCell>
        <TableCell>{lecture.description}</TableCell>

        
      </TableRow>
      {/* {isSelected && (
        <TableRow>
        <TableCell colSpan={10} className="p-0">
          <div className="p-4 bg-gray-50 transition-all duration-300" style={{ padding:"15px",margin: '0px', maxHeight: '500px', overflowY: 'auto' }} >
          <LectureInfoTab lectureId={lecture.id}/>
          </div>
        </TableCell>
        </TableRow>
      )} */}
      </>
    )
  }

  // 전체 페이지 번호 배열 생성
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  // const [dimcFilter, setDimcFilter] = useState({D:{기초:false, 중급:false, 심화:false}, I:{기초:false, 중급:false, 심화:false}, M:{기초:false, 중급:false, 심화:false}, C:{기초:false, 중급:false, 심화:false}})

  return (
    <div className="p-8">
      <title>Shark 관리페이지 | 강의 준비물 관리</title> 
      <h1 className="pageTitle">강의 준비물 관리</h1>

      {/* 검색 필터 */}
      <Card className="box">
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-5 gap-4">
          <Input
            placeholder="ID"
            value={filters.id}
            onChange={(e) => setFilters({ ...filters, id: e.target.value })}
          />
          <Input 
            placeholder="물품이름"
            value={filters.item_name}
            onChange={(e) => setFilters({ ...filters, item_name: e.target.value })}
          />
          <Input
            placeholder="설명"
            value={filters.description}
            onChange={(e) => setFilters({ ...filters, description: e.target.value })}
          />
          <p/>
          {/* {id:1,item_name:물품이름1,description:"여기서부터 설명"} */}
          <Button onClick={handleReset}>초기화</Button>
        </div>
      </Card>

      {/* 유저 관리 버튼 및 테이블 */}
      <Card className="box flex flex-col min-h-screen" style={{ minHeight: "580px" }}>
        <div className="flex gap-2 mb-4">
          
          <Button onClick={() => router.push('/management/class/supplies/register')}>
          물품 추가
          </Button>
          <Button
            variant="outline"
            disabled={!selectedAdmin}
            onClick={() => router.push(`/management/class/supplies/edit/${selectedAdmin?.id}`)}
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
                <TableHead>수업번호</TableHead>
                <TableHead>물품이름</TableHead>
                <TableHead>수량</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.length > 0 ? (
                userList.map((lecture) => (
                  <LectureTableRow key={lecture.id} lecture={lecture} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
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
