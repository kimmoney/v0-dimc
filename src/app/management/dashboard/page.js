'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import CircularProgress from './circular-progress'
// src\app\management\component\dashboard\circular-progress.js
// 월간 현황 데이터 예시
const monthlyData = [
  { month: 'Aug', value: 2 },
  { month: 'Sep', value: 3 },
  { month: 'Oct', value: 3 },
  { month: 'Nov', value: 4 },
  { month: 'Dec', value: 5 },
  { month: 'Jan', value: 3 },
]

// 보안 모니터링 데이터 예시
const securityData = [
  { date: '2024-01-16', value: 0.2 },
  { date: '2024-01-17', value: 0.3 },
  { date: '2024-01-18', value: 0.8 },
  { date: '2024-01-19', value: 0.6 },
  { date: '2024-01-20', value: 0.4 },
  { date: '2024-01-21', value: 0.5 },
  { date: '2024-01-22', value: 0.7 },
]

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="pageTitle">대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Daily Event */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Daily Event</CardTitle>
            <div className="text-xs text-muted-foreground">
              24.01.23.00:15 ~ 24.01.23.01:15
            </div>
          </CardHeader>
          <CardContent className="flex justify-around">
            <div className="text-center">
              <CircularProgress value={75} />
              <div className="mt-2 text-sm">처리완료 (3/4건)</div>
            </div>
            <div className="text-center">
              <CircularProgress value={50} />
              <div className="mt-2 text-sm">처리완료 (2/4건)</div>
            </div>
          </CardContent>
        </Card>

        {/* CPU Top 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Top 5</CardTitle>
            <div className="text-xs text-muted-foreground">24.01.23.01:15</div>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            현재 데이터가 없습니다
          </CardContent>
        </Card>

        {/* Security Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
            <div className="text-xs text-muted-foreground">2024.01.16 ~ 2024.01.22</div>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={securityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).getDate()}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Usage Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">이용 내역</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            서비스 이용 내역이 없습니다
          </CardContent>
        </Card>

        {/* Network Usage Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">이용 내역</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            현재 데이터가 없습니다
          </CardContent>
        </Card>

        {/* Monthly Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">월별 정보</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div>현재 상태: <span className="font-bold">4,169</span></div>
              <div>전년 기준: <span>2023.01.01 ~ 2023.01.23</span></div>
            </div>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

