"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimeFilter = "day" | "month" | "year"
type StatisticsTab = "revenue" | "deposit"

interface RevenueData {
  qrBank: string
  momo: string
  card: string
  userWithdraw: string
  actualWithdraw: string
  total: string
}

interface DepositData {
  qrBank: string
  momo: string
  card: string
  total: string
}

const mockRevenueData: RevenueData[] = [
  {
    qrBank: "8,000,000đ",
    momo: "5,000,000đ",
    card: "2,000,000đ",
    userWithdraw: "5,000,000đ",
    actualWithdraw: "4,500,000đ",
    total: "10,500,000đ",
  },
  {
    qrBank: "6,000,000đ",
    momo: "4,000,000đ",
    card: "2,000,000đ",
    userWithdraw: "4,000,000đ",
    actualWithdraw: "3,600,000đ",
    total: "8,400,000đ",
  },
]

const mockDepositData: DepositData[] = [
  {
    qrBank: "8,000,000đ",
    momo: "5,000,000đ",
    card: "2,000,000đ",
    total: "10,500,000đ",
  },
  {
    qrBank: "6,000,000đ",
    momo: "4,000,000đ",
    card: "2,000,000đ",
    total: "8,400,000đ",
  },
]

export function StatisticsTab() {
  const [activeTab, setActiveTab] = React.useState<StatisticsTab>("revenue")
  const [timeFilter, setTimeFilter] = React.useState<TimeFilter>("month")

  const getTimeDisplay = (index: number): string => {
    switch (timeFilter) {
      case "day":
        return index === 0 ? "20-03-2025" : "19-03-2025"
      case "month":
        return index === 0 ? "Tháng 5/2024" : "Tháng 4/2024"
      case "year":
        return index === 0 ? "Năm 2025" : "Năm 2024"
      default:
        return "Tháng 5/2024"
    }
  }

  const getTimeFilterLabel = (filter: TimeFilter): string => {
    switch (filter) {
      case "day":
        return "Theo ngày"
      case "month":
        return "Theo tháng"
      case "year":
        return "Theo năm"
      default:
        return "Theo tháng"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Thống kê</h1>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "revenue" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Thống kê doanh thu
        </button>
        <button
          onClick={() => setActiveTab("deposit")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "deposit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Thống kê nạp tiền
        </button>
      </div>

      {/* Content */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          {/* Tab Header with Time Filter */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {activeTab === "revenue" ? "Thống kê doanh thu" : "Thống kê nạp tiền"}
            </h2>
            <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Theo ngày</SelectItem>
                <SelectItem value="month">Theo tháng</SelectItem>
                <SelectItem value="year">Theo năm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Statistics Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Thời gian</TableHead>
                <TableHead className="font-semibold">QR Ngân Hàng</TableHead>
                <TableHead className="font-semibold">Momo</TableHead>
                <TableHead className="font-semibold">Thẻ cào</TableHead>
                {activeTab === "revenue" && (
                  <>
                    <TableHead className="font-semibold">User rút tiền</TableHead>
                    <TableHead className="font-semibold">Thực rút</TableHead>
                  </>
                )}
                <TableHead className="font-semibold">Tổng Doanh thu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === "revenue"
                ? mockRevenueData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{getTimeDisplay(index)}</TableCell>
                      <TableCell>{item.qrBank}</TableCell>
                      <TableCell>{item.momo}</TableCell>
                      <TableCell>{item.card}</TableCell>
                      <TableCell>{item.userWithdraw}</TableCell>
                      <TableCell>{item.actualWithdraw}</TableCell>
                      <TableCell className="font-medium">{item.total}</TableCell>
                    </TableRow>
                  ))
                : mockDepositData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{getTimeDisplay(index)}</TableCell>
                      <TableCell>{item.qrBank}</TableCell>
                      <TableCell>{item.momo}</TableCell>
                      <TableCell>{item.card}</TableCell>
                      <TableCell className="font-medium">{item.total}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
