import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="flex justify-between items-center px-8 py-5 bg-[rgba(253,248,243,0.8)] backdrop-blur-md border-b border-[rgba(38,38,38,0.08)] sticky top-0 z-50">
            <h2 className="text-xs font-black tracking-[0.25em] text-[#262626] uppercase">
                Intelligence Platform
            </h2>

            <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border border-[rgba(38,38,38,0.08)] rounded-full text-[10px] font-black tracking-[0.2em] text-[#262626] uppercase hover:bg-[#e4a4bd] hover:border-[#e4a4bd] transition-all duration-300 cursor-pointer"
            >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
            </button>
        </nav>
    );
}