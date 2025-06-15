"use client"

import type * as React from "react"
import { BarChart3, FileText, Users, Home, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar className="bg-white w-52" {...props}>
      <SidebarHeader className="p-2">
        <div className="flex items-center justify-center">
          <span className="text-lg font-bold italic text-orange-500">9</span>
          <span className="text-lg font-bold italic text-green-500">Document</span>
        </div>
        <div className="mt-2 text-lg font-bold text-black text-center">Admin Dashboard</div>

        <Separator className="mx-0 my-2" />

        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-muted/50">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-green-500 text-white text-xs">NV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium truncate">Nguyễn Văn A</span>
            <span className="text-xs text-muted-foreground truncate">admin@example.com</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pb-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={
                      activeTab === item.id
                        ? "bg-green-500 text-white hover:bg-green-500 font-bold text-sm px-3 py-2"
                        : "hover:bg-gray-100 text-sm px-3 py-2"
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

        <Separator className="mx-0 my-1.5" />

        <div className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 text-sm px-3 py-2">
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

    </Sidebar>
  )
}
