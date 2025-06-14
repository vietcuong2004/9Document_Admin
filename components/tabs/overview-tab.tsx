import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Download, DollarSign } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}

function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

interface DocumentItem {
  id: string
  title: string
  author: string
  timeAgo: string
}

interface UserItem {
  id: string
  name: string
  email: string
  timeAgo: string
}

const popularDocuments: DocumentItem[] = [
  {
    id: "1",
    title: "#1. Báo cáo NCKH OCR",
    author: "Đăng bởi Vương Việt Cường",
    timeAgo: "Đã đăng 2 giờ trước",
  },
  {
    id: "2",
    title: "#2. Công nghệ phần mềm TLU",
    author: "Đăng bởi Nguyễn Văn A",
    timeAgo: "Đã đăng 2 ngày trước",
  },
  {
    id: "3",
    title: "#3. Tương tác người máy TLU",
    author: "Đăng bởi Nguyễn Văn A",
    timeAgo: "Đã đăng 3 tháng trước",
  },
]

const newUsers: UserItem[] = [
  {
    id: "1",
    name: "Vương Việt Cường",
    email: "cuong@gmail.com",
    timeAgo: "1 ngày trước",
  },
  {
    id: "2",
    name: "Lê Minh Hiếu",
    email: "hieu@gmail.com",
    timeAgo: "1 ngày trước",
  },
  {
    id: "3",
    name: "Nguyễn Bảo Danh",
    email: "danh@gmail.com",
    timeAgo: "1 ngày trước",
  },
]

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng người dùng"
          value="1,234"
          subtitle="Tăng 5% so với tháng trước"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Tổng tài liệu"
          value="5,678"
          subtitle="Tăng 8% so với tháng trước"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Lượt tải xuống"
          value="12,345"
          subtitle="Tăng 12% so với tháng trước"
          icon={<Download className="h-4 w-4" />}
        />
        <StatCard
          title="Doanh thu"
          value="15,000,000đ"
          subtitle="Tăng 20% so với tháng trước"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Content Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Popular Documents */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tài liệu nổi bật nhất</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularDocuments.map((doc) => (
              <div key={doc.id} className="space-y-1">
                <h4 className="font-medium text-sm">{doc.title}</h4>
                <p className="text-xs text-muted-foreground">{doc.author}</p>
                <p className="text-xs text-muted-foreground">{doc.timeAgo}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* New Users */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Người dùng mới đăng ký</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {newUsers.map((user) => (
              <div key={user.id} className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">{user.timeAgo}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
