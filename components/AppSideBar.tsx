
"use client"
import { LayoutDashboard, FolderKanban, Lightbulb, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Insights", href: "#/insights", icon: Lightbulb },
  { name: "Reports", href: "#/reports", icon: FileText },
  { name: "Predictive Insights", href: "/predictive", icon: TrendingUp },
];

export function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <LayoutDashboard className="h-6 w-6 text-app-primary" />
        <span className="ml-3 text-lg font-semibold text-foreground">Morero Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-app-primary text-app-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          © 2025 Morero Construction
        </div>
      </div>
    </aside>
  );
}
