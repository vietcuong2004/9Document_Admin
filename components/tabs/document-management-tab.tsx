"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Document {
  id: string
  title: string
  author: string
  category: string
  price: string
  status: "success" | "failed"
  views: number
  downloads: number
  uploadDate: string
  description?: string
  keywords?: string
}

const mockDocuments: Document[] = [
  {
    id: "123341",
    title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch",
    author: "Nguyễn Văn A",
    category: "Luận văn",
    price: "50,000đ",
    status: "success",
    views: 1250,
    downloads: 320,
    uploadDate: "08-05-2024",
    description:
      "Tài liệu tuyển chọn những bài luận văn hay nhất về phát triển sản phẩm du lịch, bao gồm các nghiên cứu chuyên sâu về marketing du lịch, phát triển điểm đến và quản lý dịch vụ du lịch.",
    keywords: "du lịch, marketing, phát triển sản phẩm",
  },
  {
    id: "123342",
    title: "Hướng dẫn làm đồ án hệ thống cung cấp điện",
    author: "Trần Thị B",
    category: "Đồ án",
    price: "30,000đ",
    status: "failed",
    views: 980,
    downloads: 245,
    uploadDate: "07-08-2024",
    description:
      "Tài liệu 'Học máy nâng cao' cung cấp một cái nhìn sâu sắc và toàn diện về các thuật toán, kỹ thuật và mô hình tiên tiến trong lĩnh vực Học máy. Đây là một tài liệu chuyên sâu, được thiết kế dành cho các nhà nghiên cứu, kỹ sư dữ liệu, nhà khoa học dữ liệu, và sinh viên sau đại học những người đã nắm vững các nguyên tắc cơ bản của Học máy và muốn đào sâu hơn vào các phương pháp hiện đại, giải quyết các bài toán phức tạp trong thế giới thực. Tài liệu tập trung vào việc đi từ lý thuyết nền tảng đến các ứng dụng thực tiễn, giúp người đọc không chỉ hiểu 'cách thức hoạt động' mà còn có 'tại sao chúng hoạt động' và 'khi nào nên sử dụng'.",
    keywords: "Học máy",
  },
]

export function DocumentManagementTab() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAddMode, setIsAddMode] = React.useState(false)
  const [isViewMode, setIsViewMode] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [documents, setDocuments] = React.useState<Document[]>(mockDocuments)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false)
  const [documentToDelete, setDocumentToDelete] = React.useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = React.useState<Document | null>(null)
  const [formData, setFormData] = React.useState({
    title: "",
    category: "",
    description: "",
    keywords: "",
    price: "",
  })
  const [editFormData, setEditFormData] = React.useState({
    title: "",
    category: "",
    description: "",
    keywords: "",
    price: "",
  })

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: "success" | "failed") => {
    if (status === "success") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 w-32 justify-center whitespace-nowrap">
          Tải thành công
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 w-32 justify-center whitespace-nowrap">
        Không thành công
      </Badge>
    )
  }

  const handleAddDocument = () => {
    if (!formData.title || !formData.category || !formData.price) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }

    const newDocument: Document = {
      id: (Math.floor(Math.random() * 900000) + 100000).toString(),
      title: formData.title,
      author: "Admin",
      category: formData.category,
      price: formData.price,
      status: "success",
      views: 0,
      downloads: 0,
      uploadDate: new Date().toLocaleDateString("vi-VN"),
      description: formData.description,
      keywords: formData.keywords,
    }

    setDocuments([newDocument, ...documents])
    setIsAddMode(false)
    resetForm()
  }

  const handleViewDocument = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId)
    if (document) {
      setSelectedDocument(document)
      setIsViewMode(true)
    }
  }

  const handleEditDocument = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId)
    if (document) {
      setSelectedDocument(document)
      setEditFormData({
        title: document.title,
        category: document.category,
        description: document.description || "",
        keywords: document.keywords || "",
        price: document.price,
      })
      setIsEditMode(true)
    }
  }

  const handleUpdateDocument = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!editFormData.title || !editFormData.category || !editFormData.price) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }

    setIsUpdateModalOpen(true)
  }

  const handleConfirmUpdate = () => {
    if (selectedDocument) {
      const updatedDocuments = documents.map((doc) =>
        doc.id === selectedDocument.id
          ? {
              ...doc,
              title: editFormData.title,
              category: editFormData.category,
              description: editFormData.description,
              keywords: editFormData.keywords,
              price: editFormData.price,
            }
          : doc,
      )
      setDocuments(updatedDocuments)
      setIsUpdateModalOpen(false)
      setIsEditMode(false)
      setSelectedDocument(null)
      resetEditForm()
    }
  }

  const handleCancelUpdate = () => {
    setIsUpdateModalOpen(false)
  }

  const handleDeleteClick = (documentId: string) => {
    setDocumentToDelete(documentId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete))
      setIsDeleteModalOpen(false)
      setDocumentToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setDocumentToDelete(null)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      keywords: "",
      price: "",
    })
  }

  const resetEditForm = () => {
    setEditFormData({
      title: "",
      category: "",
      description: "",
      keywords: "",
      price: "",
    })
  }

  const handleBackToList = () => {
    setIsAddMode(false)
    setIsViewMode(false)
    setIsEditMode(false)
    setSelectedDocument(null)
    resetForm()
    resetEditForm()
  }

  // Render Edit Document Form
  if (isEditMode && selectedDocument) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sửa thông tin cho tài liệu</h1>
          <Button variant="ghost" onClick={handleBackToList} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Trở lại
          </Button>
        </div>

        {/* Edit Form */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Tên tài liệu *
                </Label>
                <Input
                  id="title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Danh mục *
                </Label>
                <Select
                  value={editFormData.category}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luận văn">Luận văn</SelectItem>
                    <SelectItem value="Báo cáo">Báo cáo</SelectItem>
                    <SelectItem value="Đồ án">Đồ án</SelectItem>
                    <SelectItem value="Tài liệu học tập">Tài liệu học tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="min-h-[150px] resize-none w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium">
                  Từ khóa
                </Label>
                <Input
                  id="keywords"
                  value={editFormData.keywords}
                  onChange={(e) => setEditFormData({ ...editFormData, keywords: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Giá bán *
                </Label>
                <Input
                  id="price"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center pt-6 w-full">
                <Button
                  onClick={handleUpdateDocument}
                  className="bg-green-500 hover:bg-green-600 text-white px-8"
                  type="button"
                >
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Confirmation Modal */}
        {isUpdateModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            style={{ zIndex: 99999 }}
            onClick={() => setIsUpdateModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 100000 }}
            >
              <h2 className="text-xl font-bold text-center mb-4">Xác nhận</h2>
              <p className="text-center text-gray-700 mb-6">Bạn có chắc chắn muốn thay đổi thông tin này?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleConfirmUpdate}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                  type="button"
                >
                  Xác nhận
                </button>
                <button
                  onClick={handleCancelUpdate}
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

  // Render View Document Detail
  if (isViewMode && selectedDocument) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Thông tin tài liệu</h1>
          <Button variant="ghost" onClick={handleBackToList} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Trở lại
          </Button>
        </div>

        {/* View Form */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Tên tài liệu *
                </Label>
                <Input id="title" value={selectedDocument.title} className="w-full" readOnly disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Danh mục *
                </Label>
                <Select value={selectedDocument.category} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luận văn">Luận văn</SelectItem>
                    <SelectItem value="Báo cáo">Báo cáo</SelectItem>
                    <SelectItem value="Đồ án">Đồ án</SelectItem>
                    <SelectItem value="Tài liệu học tập">Tài liệu học tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  value={selectedDocument.description || ""}
                  className="min-h-[150px] resize-none w-full"
                  readOnly
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium">
                  Từ khóa
                </Label>
                <Input id="keywords" value={selectedDocument.keywords || ""} className="w-full" readOnly disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Giá bán *
                </Label>
                <Input id="price" value={selectedDocument.price} className="w-full" readOnly disabled />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render Add Document Form
  if (isAddMode) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Thêm thông tin cho tài liệu</h1>
          <Button variant="ghost" onClick={handleBackToList} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Trở lại
          </Button>
        </div>

        {/* Add Form */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Tên tài liệu *
                </Label>
                <Input
                  id="title"
                  placeholder="Nhập tên tài liệu"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Danh mục *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luận văn">Luận văn</SelectItem>
                    <SelectItem value="Báo cáo">Báo cáo</SelectItem>
                    <SelectItem value="Đồ án">Đồ án</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[150px] resize-none w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium">
                  Từ khóa
                </Label>
                <Input
                  id="keywords"
                  placeholder="Để có kết quả cao tại thứ hạng tìm kiếm"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Giá bán *
                </Label>
                <Input
                  id="price"
                  placeholder="Miễn phí"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center pt-6 w-full">
                <Button onClick={handleAddDocument} className="bg-green-500 hover:bg-green-600 text-white px-8">
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render Document List (Default View)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách tài liệu</h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setIsAddMode(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm tài liệu mới
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <Input
            placeholder="Nhập ID tài liệu để tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Tiêu đề</TableHead>
                <TableHead className="font-semibold">Tác giả</TableHead>
                <TableHead className="font-semibold">Danh mục</TableHead>
                <TableHead className="font-semibold">Giá bán</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="font-semibold">Lượt xem</TableHead>
                <TableHead className="font-semibold">Lượt tải</TableHead>
                <TableHead className="font-semibold">Ngày đăng</TableHead>
                <TableHead className="font-semibold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{doc.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={doc.title}>
                      {doc.title}
                    </div>
                  </TableCell>
                  <TableCell>{doc.author}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell className="font-medium">{doc.price}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.views.toLocaleString()}</TableCell>
                  <TableCell>{doc.downloads}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-gray-50"
                        onClick={() => handleViewDocument(doc.id)}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-gray-50"
                        onClick={() => handleEditDocument(doc.id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-red-500 text-white hover:bg-red-600 border-0"
                        onClick={() => handleDeleteClick(doc.id)}
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

      {filteredDocuments.length === 0 && searchTerm && (
        <div className="text-center py-8 text-muted-foreground">
          Không tìm thấy tài liệu nào với từ khóa "{searchTerm}"
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
            <p className="text-center text-gray-700 mb-6">Bạn có chắc chắn muốn xóa tài liệu này?</p>
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
