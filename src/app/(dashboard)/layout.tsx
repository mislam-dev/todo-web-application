import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex min-h-screen bg-[#eef5ff]">
        <Sidebar />

        <main className="flex-1">
          <Header />
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
