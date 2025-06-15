"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
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

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset className="bg-gray-100 ml-52">
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-100">{renderTabContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
