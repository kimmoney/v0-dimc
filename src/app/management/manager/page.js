/* eslint-disable react-hooks/exhaustive-deps */
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination, 
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";


export default function AdminPage() {

    const managerRank = (process.env.NEXT_PUBLIC_MANAGER_RANK || "").split(",").map(s => s.trim());
    const managerRole = (process.env.NEXT_PUBLIC_MANAGER_ROLE || "").split(",").map(s => s.trim());
    const router = useRouter();
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [filters, setFilters] = useState({
        name: '',     // admin_name
        userId: '',   // site_id
        phone: '',    // phone_number
        rank: ' ',     // rank (예: '사원', '대표', '과장', '개발자')
        role: ' ',     // role (예: '관리자', '최고관리자')
        status: ' ',   // status (예: '정상', '정지')
    })

  const [adminList, setAdminList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // 필터 값이 바뀔 때마다 현재 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // 관리자 목록을 불러오는 함수 (필터와 페이지 번호에 따라 호출)
  const fetchAdmins = async () => {
    // 토큰 출력
    
    setLoading(true)
    console.log('fetchAdmins 호출됨')
    try {
      // 쿼리 파라미터 생성 (문자열 형태로 변환)
      const params = new URLSearchParams({
        limit: '10',
        page: currentPage.toString(),
        name: filters.name,
        userId: filters.userId,
        phone: filters.phone,
        rank: filters.rank,
        role: filters.role,
        status: filters.status,
      })
      console.log('파라미터:', params.toString())

      const res = await fetch(`/api/management/manager/search?${params.toString()}`);
      console.log('res:', res)  
      if (res.ok) {
        const data = await res.json()
        console.log(data)

        // data.admins: 관리자 목록, data.totalPages: 전체 페이지 수 (DB 쿼리 결과에 따라 변경)
        setAdminList(data.admins)
        setTotalPages(data.totalPages)
      } else {
        console.log('관리자 데이터를 불러오는 데 실패했습니다.')
        console.error('관리자 데이터를 불러오는 데 실패했습니다.')
      }
    } catch (error) {
      console.log('에러:', error)
      console.error('에러:', error)
    } finally {
      setLoading(false)
    }
  }

  // 필터나 현재 페이지가 변경될 때마다 데이터를 다시 불러옴
  useEffect(() => {
    fetchAdmins()
    //테이블 선택 취소
    setSelectedAdmin(null)
  }, [filters, currentPage,])


  const handleReset = () => {
    setFilters({
    name: '',     // admin_name
    userId: '',   // site_id
    phone: '',    // phone_number
    rank: ' ',     // rank (예: '사원', '대표', '과장', '개발자')
    role: ' ',     // role (예: '관리자', '최고관리자')
    status: ' ',
    })
    setCurrentPage(1)
  }

  const handleDelete = () => {
    if (selectedAdmin && confirm('선택한 관리자를 삭제하시겠습니까?')) {
      // 실제 삭제 API 호출 로직 구현 후, 성공 시 fetchAdmins() 재호출
      console.log('삭제할 관리자:', selectedAdmin)
      //src/app/api/management/manager/delete/route.js
      fetch(`/api/management/manager/delete?id=${selectedAdmin.id}`, {
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

  // 관리자 테이블 행 컴포넌트
  const AdminTableRow = ({ admin }) => {
    const isSelected = selectedAdmin?.id === admin.id
    return (
      <TableRow
        className={`cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
        onClick={() => setSelectedAdmin(admin)}
      >
        <TableCell>{admin.site_id}</TableCell>
        <TableCell>{admin.admin_name}</TableCell>
        <TableCell>{admin.phone_number}</TableCell>
        <TableCell>{admin.rank}</TableCell>
        <TableCell>{admin.role}</TableCell>
        <TableCell>
          {admin.status === '정상'
            ? <span className="text-green-600">정상</span>
            : <span className="text-red-600">정지</span>}
        </TableCell>
      </TableRow>
    )
  }

  // 전체 페이지 번호 배열 생성
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="p-8">
      <h1 className="pageTitle">관리자</h1>

      {/* 검색 필터 */}
      <Card className="box">
        {/* <div className="grid grid-cols-4 gap-4 mb-6">  */}
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-4">
            <Input
            placeholder="이름"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <Input
            placeholder="아이디"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
            />
            <Input
            placeholder="전화번호"
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
            />
            <Select
            value={filters.rank}
            onValueChange={(value) => setFilters({ ...filters, rank: value })}
            >
            <SelectTrigger>
                <SelectValue placeholder="직책" />
            </SelectTrigger>
            <SelectContent>
                {/* admin_info 테이블의 rank enum 값에 맞게 옵션 작성 */}
                <SelectItem value=" ">직책</SelectItem>
                {managerRank.map((rank) => (
                    <SelectItem key={rank} value={rank}>{rank}</SelectItem> 
                ))}

            </SelectContent>
            </Select>
            <Select
            value={filters.role}
            onValueChange={(value) => setFilters({ ...filters, role: value })}
            >
            <SelectTrigger>
                <SelectValue placeholder="권한" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value=" ">권한</SelectItem>
                {managerRole.map((role) => (
                    <SelectItem key={role} value={role}>
                    {role}
                    </SelectItem>
                ))}
            </SelectContent>
            </Select>
            <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
            <SelectTrigger>
                <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
                {/* DB의 status enum 값에 맞게 옵션 작성 */}
                <SelectItem value=" ">상태</SelectItem>
                <SelectItem value="정상">정상</SelectItem>
                <SelectItem value="정지">정지</SelectItem>
            </SelectContent>
            </Select>
            <p/>
            <Button onClick={handleReset}>초기화</Button>
            {/* <Button onClick={handleSearch}>검색</Button> */}
            </div>
        </Card>
        {/* 관리자 관리 버튼 */}

    <Card className="box flex flex-col min-h-scree" style={{minHeight:"580px" }}>

    <div className="flex gap-2 mb-4"  >
        <Button onClick={() => router.push('/management/manager/register')}>
        관리자추가
        </Button>
        <Button
          variant="outline"
          disabled={!selectedAdmin}
          onClick={() => router.push(`/management/manager/edit/${selectedAdmin?.id}`)}
          >
          수정
        </Button>
        <Button variant="destructive" disabled={!selectedAdmin} onClick={handleDelete}>
          삭제
        </Button>
      </div>

      {/* 로딩 표시 */}

      {/* {loading && <p>로딩 중...</p>} */}
      {!loading && (
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>아이디</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>직책</TableHead>
              <TableHead>권한</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminList.length > 0 ? (
              adminList.map((admin) => (
                <AdminTableRow key={admin.id} admin={admin} />
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
      <div className="mt-auto flex justify-center" >
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
