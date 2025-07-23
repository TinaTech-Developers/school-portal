import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin Panel | TinaSoft Nexus",
  description: "Admin dashboard for managing the school portal",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <div className="fixed top-0 left-0 w-64 min-h-screen bg-white shadow-lg">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 flex flex-col h-screen">
        <div className="fixed top-0 left-64 right-0 z-10">
          <AdminNavbar />
        </div>

        <main className="mt-[64px] p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
