import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
    children,
}) {
    return (
        <div className="min-h-screen flex bg-[#fdf8f3] text-[#262626]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}