import NavBar from "./NavBar";
import SideBar from "./SideBar";

export const metadata = {
  title: "Teacher Panel | TinaSoft Nexus",
  description: "Teacher dashboard for managing the school portal",
};

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <div className="fixed top-0 left-0 w-56 min-h-screen bg-white shadow-lg ">
        <SideBar />
      </div>

      <div className="flex-1 ml-56 flex flex-col h-screen">
        <div className="fixed top-0 left-56 right-0 z-10 mb-10">
          <NavBar />
        </div>

        <main className="mt-[64px] p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
