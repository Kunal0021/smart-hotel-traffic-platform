import {
    LayoutDashboard,
    Hotel,
    Sparkles,
    ShieldAlert,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
    const location = useLocation();

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/hotels", label: "Hotels", icon: Hotel },
        { path: "/recommendations", label: "Recommendations", icon: Sparkles },
        { path: "/dpi", label: "DPI Monitor", icon: ShieldAlert },
    ];

    return (
        <aside className="w-64 bg-[#f5f0eb] border-r border-[rgba(38,38,38,0.08)] min-h-screen hidden md:flex flex-col text-[#262626]">
            <div className="p-8 border-b border-[rgba(38,38,38,0.05)]">
                <Link to="/" className="text-lg font-black tracking-[0.25em] text-[#262626] uppercase">
                    Smart Hotel
                </Link>
                <div className="text-[9px] font-bold tracking-[0.4em] text-[#e4a4bd] uppercase mt-1">
                    Editorial Tier
                </div>
            </div>

            <nav className="p-6 flex-1">
                <ul className="space-y-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                                        isActive
                                            ? "bg-[#e4a4bd] text-[#262626] shadow-sm"
                                            : "text-[rgba(38,38,38,0.7)] hover:bg-[rgba(38,38,38,0.03)] hover:text-[#262626]"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}