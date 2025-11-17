import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex min-h-screen bg-[#eef5ff]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1">
          <Header />
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
