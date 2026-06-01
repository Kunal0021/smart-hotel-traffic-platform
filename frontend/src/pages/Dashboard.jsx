import { useEffect, useState } from "react";
import API from "../api/axios";
import socket from "../socket";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

import RevenueChart from "../components/RevenueChart";




export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {

        fetchStats();


        socket.on(
            "newBooking",
            (data) => {

                console.log(
                    data.message
                );

                fetchStats();
            }
        );


        return () => {
            socket.off(
                "newBooking"
            );
        };

    }, []);

    const fetchStats = async () => {
        try {

            console.log(
                "Fetching stats..."
            );

            const { data } =
                await API.get(
                    "/admin/stats"
                );


            console.log(
                "Stats Response:",
                data
            );


            setStats(
                data.stats
            );

        } catch (error) {

            console.log(
                "Stats Error:",
                error.response?.data ||
                error.message
            );

        }
    };

    if (!stats) {
        return (
            <DashboardLayout>
                <h2>Loading...</h2>
            </DashboardLayout>
        );
    }

    const chartData =
        stats.monthlyRevenue?.map(
            (item) => ({
                month: `Month ${item._id.month}`,
                revenue: item.revenue,
            })
        ) || [];


    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">
                Analytics Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
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

                <StatCard
                    title="Confirmed"
                    value={stats.confirmedBookings}
                />

                <StatCard
                    title="Cancelled"
                    value={stats.cancelledBookings}
                />
            </div>

            <div className="mt-8">
                <RevenueChart
                    data={chartData}
                />
            </div>
        </DashboardLayout>
    );
}