"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
}

interface Transaction {
  id: string
  time: string
  content: string
  status: "success" | "failed"
  amount: number
  balance: number
  type?: string
}

interface UserFinanceTabProps {
  user: User
  onBack: () => void
}

const mockPurchaseTransactions: Transaction[] = [
  {
    id: "9Document-123456",
    time: "Tháng 5/2024",
    content: 'Tải tài liệu "Tương tác người máy nâng cao"',
    status: "success",
    amount: 20000,
    balance: 300000,
  },
  {
    id: "9Document-678933",
    time: "Tháng 4/2024",
    content: 'Mua tài liệu "Học máy nâng cao"',
    status: "failed",
    amount: 50000,
    balance: 300000,
  },
]

const mockRevenueTransactions: Transaction[] = [
  {
    id: "9Document-123456",
    time: "Tháng 5/2024",
    type: "Rút tiền",
    content: 'Rút tiền về tài khoản VUONG VIET CUONG - BIDV',
    status: "success",
    amount: 20000,
    balance: 300000,
  },
  {
    id: "9Document-678933",
    time: "Tháng 4/2024",
    type: "Bán tài liệu",
    content: 'Bán tài liệu "Học máy nâng cao"',
    status: "success",
    amount: 20000,
    balance: 400000,
  },
  {
    id: "9Document-111111",
    time: "Tháng 3/2024",
    type: "Rút tiền",
    content: 'Rút tiền về tài khoản VUONG VIET CUONG - BIDV',
    status: "failed",
    amount: 200000,
    balance: 500000,
  },
]

export function UserFinanceTab({ user, onBack }: UserFinanceTabProps) {
  const [activeTab, setActiveTab] = React.useState<"purchase" | "revenue">("purchase")

  const getStatusBadge = (status: "success" | "failed") => {
    if (status === "success") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 w-24 justify-center whitespace-nowrap">
          Thành công
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 w-24 justify-center whitespace-nowrap">
        Thất bại
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ"
  }

  const currentTransactions = activeTab === "purchase" ? mockPurchaseTransactions : mockRevenueTransactions

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tài chính: User {user.name}</h1>
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Trở lại
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Số dư tài khoản mua tài liệu</h3>
            <p className="text-3xl font-bold text-gray-600">300.000 đ</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Số dư tài khoản doanh thu</h3>
            <p className="text-3xl font-bold text-gray-600">550.000 đ</p>
          </CardContent>
        </Card>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("purchase")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "purchase" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Tài khoản mua tài liệu
        </button>
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "revenue" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Tài khoản doanh thu
        </button>
      </div>

      {/* Transactions Table */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Mã Giao dịch</TableHead>
                <TableHead className="font-semibold">Thời gian</TableHead>
                {activeTab === "revenue" && <TableHead className="font-semibold">Loại giao dịch</TableHead>}
                <TableHead className="font-semibold">Nội dung</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Số tiền</TableHead>
                <TableHead className="font-semibold">Số dư tài khoản</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  {activeTab === "revenue" && <TableCell>{transaction.type}</TableCell>}
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={transaction.content}>
                      {transaction.content}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(transaction.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
