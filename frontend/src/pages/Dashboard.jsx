import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Search, Hotel, Calendar } from "lucide-react";

import API from "../api/axios";
import socket from "../socket";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";


export default function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] =
        useState(null);

    const [isUser, setIsUser] =
        useState(false);


    const fetchStats = async () => {
        try {
            const { data } = await API.get("/admin/stats");
            setStats(data.stats);
        } catch (error) {
            console.log("Normal user detected", error);
            setIsUser(true);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStats();

        socket.on("newBooking", () => {
            fetchStats();
        });

        return () => {
            socket.off("newBooking");
        };
    }, []);



    if (isUser) {
        return (
            <DashboardLayout>
                <div className="mb-10 lp-reveal active">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#e4a4bd] uppercase">
                        Guest Portal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#262626] mt-2 mb-4 tracking-tight uppercase">
                        Welcome, <span className="font-light italic text-[#e4a4bd] lowercase">user</span>
                    </h1>
                    <p className="text-[13px] text-[rgba(38,38,38,0.7)] max-w-xl font-normal leading-relaxed">
                        Welcome to the smart hospitality suite. Manage bookings, explore local destinations, and experience our real-time traffic-aware navigation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div
                        onClick={() => navigate("/hotels")}
                        className="luxury-card p-8 rounded-2xl cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between h-52 group"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#fdf8f3] flex items-center justify-center border border-[rgba(38,38,38,0.05)] text-[#e4a4bd] mb-6 group-hover:bg-[#e4a4bd] group-hover:text-[#262626] transition-all duration-300">
                                <Search className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-black tracking-[0.2em] text-[#262626] uppercase">
                                Browse Hotels
                            </h3>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] mt-2">
                                Explore premium handpicked suites and destinations tailored to your preference.
                            </p>
                        </div>
                        <div className="text-[10px] font-black tracking-[0.1em] text-[#e4a4bd] group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1 mt-4">
                            EXPLORE NOW <span>→</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/hotels")}
                        className="luxury-card p-8 rounded-2xl cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between h-52 group"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#fdf8f3] flex items-center justify-center border border-[rgba(38,38,38,0.05)] text-[#e4a4bd] mb-6 group-hover:bg-[#e4a4bd] group-hover:text-[#262626] transition-all duration-300">
                                <Hotel className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-black tracking-[0.2em] text-[#262626] uppercase">
                                Book Rooms
                            </h3>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] mt-2">
                                Make reservations at top-tier locations with dynamic pricing and traffic congestion analysis.
                            </p>
                        </div>
                        <div className="text-[10px] font-black tracking-[0.1em] text-[#e4a4bd] group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1 mt-4">
                            RESERVE STAY <span>→</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/bookings")}
                        className="luxury-card p-8 rounded-2xl cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between h-52 group"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-[#fdf8f3] flex items-center justify-center border border-[rgba(38,38,38,0.05)] text-[#e4a4bd] mb-6 group-hover:bg-[#e4a4bd] group-hover:text-[#262626] transition-all duration-300">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-black tracking-[0.2em] text-[#262626] uppercase">
                                Manage Bookings
                            </h3>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] mt-2">
                                Review your reservation schedule, modify details, or check live check-in statuses.
                            </p>
                        </div>
                        <div className="text-[10px] font-black tracking-[0.1em] text-[#e4a4bd] group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1 mt-4">
                            MANAGE SCHEDULE <span>→</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-[rgba(38,38,38,0.08)]">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#e4a4bd] uppercase block mb-6">
                        Platform Services
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#f5f0eb] border border-[rgba(38,38,38,0.08)] p-6 rounded-2xl">
                            <span className="text-[9px] font-black tracking-[0.3em] text-[#e4a4bd] uppercase block mb-3">
                                01 / Browse Hotels
                            </span>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] leading-relaxed">
                                Our interface offers comprehensive filters and detailed listings to find ideal stays. Keep track of room tiers, price ranges, and locations effortlessly.
                            </p>
                        </div>

                        <div className="bg-[#f5f0eb] border border-[rgba(38,38,38,0.08)] p-6 rounded-2xl">
                            <span className="text-[9px] font-black tracking-[0.3em] text-[#e4a4bd] uppercase block mb-3">
                                02 / Book Rooms
                            </span>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] leading-relaxed">
                                Complete booking in seconds. Secure payment integration and real-time confirmations sync directly with our database.
                            </p>
                        </div>

                        <div className="bg-[#f5f0eb] border border-[rgba(38,38,38,0.08)] p-6 rounded-2xl">
                            <span className="text-[9px] font-black tracking-[0.3em] text-[#e4a4bd] uppercase block mb-3">
                                03 / Manage Bookings
                            </span>
                            <p className="text-[11px] text-[rgba(38,38,38,0.6)] leading-relaxed">
                                Need to make changes? Cancel or adjust your upcoming trips seamlessly via the bookings tab, linked straight to partner hotels.
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!stats) {
        return (
            <DashboardLayout>
                <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
                    <div className="w-10 h-10 border-2 border-[rgba(228,164,189,0.2)] border-t-[#e4a4bd] rounded-full animate-spin"></div>
                    <span className="text-[9px] font-black tracking-[0.3em] text-[rgba(38,38,38,0.4)] uppercase animate-pulse">
                        Loading Intelligence Analytics...
                    </span>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-10">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#e4a4bd] uppercase">
                    System Overview
                </span>
                <h1 className="text-4xl font-black text-[#262626] mt-2 tracking-tight uppercase">
                    Analytics <span className="font-light italic text-[#e4a4bd] lowercase">dashboard</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Users"
                    value={stats.totalUsers}
                />

                <StatCard
                    title="Hotels"
                    value={stats.totalHotels}
                />

                <StatCard
                    title="Bookings"
                    value={stats.totalBookings}
                />

                <StatCard
                    title="Revenue"
                    value={`₹${stats.totalRevenue}`}
                />
            </div>

            <RevenueChart
                data={stats.monthlyRevenue}
            />
        </DashboardLayout>
    );
}