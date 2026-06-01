import {
    LayoutDashboard,
    Hotel,
    BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <aside
            className="
            w-64
            bg-slate-900
            text-white
            min-h-screen
            hidden
            md:block
        "
        >
            <div className="p-6">
                <h2 className="text-xl font-bold">
                    Smart Hotel
                </h2>
            </div>

            <nav className="px-4">
                <ul className="space-y-5">

                    <li>
                        <Link
                            to="/dashboard"
                            className="flex gap-3"
                        >
                            <LayoutDashboard />
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/hotels"
                            className="flex gap-3"
                        >
                            <Hotel />
                            Hotels
                        </Link>
                    </li>

                    <li>
                        <Link to="/recommendations">

                            AI Recommendations

                        </Link>
                    </li>
                    <li>
                        <Link to="/dpi">

                            DPI Monitor

                        </Link>
                    </li>
                    <li>
                    </li>

                </ul>
            </nav>
        </aside>
    );
}