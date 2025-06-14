"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { DocumentManagementTab } from "@/components/tabs/document-management-tab"
import { UserManagementTab } from "@/components/tabs/user-management-tab"
import { StatisticsTab } from "@/components/tabs/statistics-tab"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "documents":
        return <DocumentManagementTab />
      case "users":
        return <UserManagementTab />
      case "statistics":
        return <StatisticsTab />
      default:
        return <OverviewTab />
    }
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Tổng quan"
      case "documents":
        return "Quản lý tài liệu"
      case "users":
        return "Quản lý người dùng"
      case "statistics":
        return "Thống kê"
      default:
        return "Tổng quan"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset className="bg-gray-100">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 bg-gray-100">{renderTabContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
