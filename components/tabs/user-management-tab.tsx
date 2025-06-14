"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserFinanceTab } from "./user-finance-tab"

interface User {
  id: number
  name: string
  email: string
  phone: string
  birthDate: string
  joinDate: string
  gender: string
  status: "active" | "inactive"
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    birthDate: "01-01-2004",
    joinDate: "01-01-2024",
    gender: "Nam",
    status: "active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    birthDate: "15-02-2004",
    joinDate: "01-01-2024",
    gender: "Nữ",
    status: "inactive",
  },
]

export function UserManagementTab() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [userToDelete, setUserToDelete] = React.useState<number | null>(null)
  const [users, setUsers] = React.useState<User[]>(mockUsers)
  const [isFinanceMode, setIsFinanceMode] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const getStatusBadge = (status: "active" | "inactive") => {
    if (status === "active") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 w-32 justify-center whitespace-nowrap">
          Hoạt động
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 w-32 justify-center whitespace-nowrap">
        Không hoạt động
      </Badge>
    )
  }

  const handleFinanceClick = (user: User) => {
    setSelectedUser(user)
    setIsFinanceMode(true)
  }

  const handleBackToUserList = () => {
    setIsFinanceMode(false)
    setSelectedUser(null)
  }

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setIsDeleteModalOpen(false)
      setUserToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  // Render Finance Management View
  if (isFinanceMode && selectedUser) {
    return <UserFinanceTab user={selectedUser} onBack={handleBackToUserList} />
  }

  // Render User List (Default View)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      {/* Search */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Tên User</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Số điện thoại</TableHead>
                <TableHead className="font-semibold">Ngày sinh</TableHead>
                <TableHead className="font-semibold">Ngày tham gia</TableHead>
                <TableHead className="font-semibold">Giới tính</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-gray-50"
                        onClick={() => handleFinanceClick(user)}
                      >
                        Tài chính
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-red-500 text-white hover:bg-red-600 border-0"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-8 text-muted-foreground">
          Không tìm thấy người dùng nào với từ khóa "{searchTerm}"
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          style={{ zIndex: 99999 }}
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100000 }}
          >
            <h2 className="text-xl font-bold text-center mb-4">Xác nhận</h2>
            <p className="text-center text-gray-700 mb-6">Bạn có chắc chắn muốn xóa người dùng này?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleConfirmDelete}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                type="button"
              >
                Xác nhận
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-md"
                type="button"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
