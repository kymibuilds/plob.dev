"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavItemProps = { 
  href: string; 
  label: string; 
  shortcut: string; 
  onClick?: () => void; 
};

function NavItem({ href, label, shortcut, onClick }: NavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center justify-between group py-2 px-2 hover:bg-muted/50 rounded-sm transition-colors"
    >
      <span className="text-sm font-medium group-hover:underline">{label}</span>
      <span className="mono text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
        {shortcut}
      </span>
    </Link>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sheet */}
      <div className={`
        fixed inset-y-0 left-0 w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-6 gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div 
              className="text-sm font-medium tracking-tight cursor-pointer" 
              onClick={() => {
                setIsOpen(false);
                router.push("/");
              }}
            >
              nyahh.plop.dev
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            <NavItem href="/links" label="links" shortcut="g l" onClick={() => setIsOpen(false)} />
            <NavItem href="/analytics" label="analytics" shortcut="g a" onClick={() => setIsOpen(false)} />
            <NavItem href="/blogs" label="blogs" shortcut="g b" onClick={() => setIsOpen(false)} />
            <NavItem href="/products" label="products" shortcut="g p" onClick={() => setIsOpen(false)} />
            <NavItem href="/sponsors" label="sponsors" shortcut="g s" onClick={() => setIsOpen(false)} />
            <NavItem href="/integrations" label="integrations" shortcut="g i" onClick={() => setIsOpen(false)} />
          </nav>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between text-sm">
            <span>© {new Date().getFullYear()}</span>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
