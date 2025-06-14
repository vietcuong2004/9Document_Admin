"use client"

import type * as React from "react"
import { BarChart3, FileText, Users, Home, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  {
    id: "overview",
    title: "Tổng quan",
    icon: Home,
  },
  {
    id: "documents",
    title: "Quản lý tài liệu",
    icon: FileText,
  },
  {
    id: "users",
    title: "Quản lý người dùng",
    icon: Users,
  },
  {
    id: "statistics",
    title: "Thống kê",
    icon: BarChart3,
  },
]

export function AppSidebar({ activeTab, onTabChange, ...props }: AppSidebarProps) {
  return (
    <Sidebar className="bg-white border-r" {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold italic text-orange-500">9</span>
          <span className="text-2xl font-bold italic text-green-500">Document</span>
        </div>
        <div className="mt-4 text-xl font-bold text-black text-center">Admin Dashboard</div>

        <Separator className="my-4" />

        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-500 text-white text-xs">NV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Nguyễn Văn A</span>
            <span className="text-xs text-muted-foreground">admin@example.com</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={
                      activeTab === item.id
                        ? "bg-green-500 text-white hover:bg-green-500 font-bold"
                        : "hover:bg-gray-100"
                    }
                  >
                    <button className="w-full" onClick={() => onTabChange(item.id)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="mx-4 mb-2" />

      <SidebarFooter className="px-4 pb-2 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
