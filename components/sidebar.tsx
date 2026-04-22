"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, BookOpen, FolderGit2, BarChart3, User, Coffee } from "lucide-react";

const navItems = [
  { name: "articles", path: "/articles", icon: BookOpen },
  { name: "projects", path: "/projects", icon: FolderGit2 },
  { name: "analytics", path: "/analytics", icon: BarChart3 },
  { name: "about", path: "/about", icon: User },
  { name: "donate", path: "/donate", icon: Coffee },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[232px] h-screen fixed left-0 top-0 border-r border-border bg-background/50 backdrop-blur-sm z-40">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-mono text-brand hover:opacity-80 transition-opacity">
          <Terminal size={20} />
          <span className="font-bold tracking-tighter">chemical_pink_v1</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                isActive 
                  ? "bg-zinc-800 text-primary border border-zinc-700" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              )}
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border text-xs text-zinc-600/[0.38] font-mono text-center">
        © {new Date().getFullYear()} chemical_pink
      </div>
    </aside>
  );
}
