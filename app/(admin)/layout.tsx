import { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}