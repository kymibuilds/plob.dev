import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-user";
import Navbar from "@/app/(dashboard)/_components/nav-bar";
import { MobileNav } from "@/app/(dashboard)/_components/mobile-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Nav */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <MobileNav />
      </div>

      {/* Fixed sidebar - Desktop only */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="md:ml-64 min-h-screen p-6 md:px-8 md:py-6 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  );
}
