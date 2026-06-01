import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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


    useEffect(() => {

        fetchStats();


        socket.on(
            "newBooking",
            () => {
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

            const { data } =
                await API.get(
                    "/admin/stats"
                );


            setStats(
                data.stats
            );


        } catch (error) {

            console.log(
                "Normal user detected"
            );

            setIsUser(true);

        }

    };



    if (isUser) {

        return (

            <DashboardLayout>

                <h1 className="text-3xl font-bold mb-5">
                    Welcome User
                </h1>


                <div className="grid grid-cols-3 gap-5">


                    <div
                        onClick={() =>
                            navigate("/hotels")
                        }

                        className="
        bg-white 
        p-5 
        rounded-xl 
        shadow
        cursor-pointer
        hover:scale-105
        transition
        "
                    >

                        Browse Hotels

                    </div>



                    <div
                        onClick={() =>
                            navigate("/hotels")
                        }

                        className="
        bg-white 
        p-5 
        rounded-xl 
        shadow
        cursor-pointer
        hover:scale-105
        transition
        "
                    >

                        Book Rooms

                    </div>



                    <div
                        onClick={() =>
                            navigate("/bookings")
                        }

                        className="
        bg-white 
        p-5 
        rounded-xl 
        shadow
        cursor-pointer
        hover:scale-105
        transition
        "
                    >

                        Manage Bookings

                    </div>


                </div>


                <div className="bg-white p-5 rounded-xl shadow">

                    Browse Hotels

                </div>


                <div className="bg-white p-5 rounded-xl shadow">

                    Book Rooms

                </div>


                <div className="bg-white p-5 rounded-xl shadow">

                    Manage Bookings

                </div>


            </DashboardLayout >

        );

    }



    if (!stats) {

        return (

            <DashboardLayout>

                Loading...

            </DashboardLayout>

        );

    }



    return (

        <DashboardLayout>


            <h1 className="text-3xl font-bold mb-6">

                Analytics Dashboard

            </h1>


            <div className="grid grid-cols-4 gap-6">


                <StatCard

                    title="Users"

                    value={
                        stats.totalUsers
                    }

                />


                <StatCard

                    title="Hotels"

                    value={
                        stats.totalHotels
                    }

                />


                <StatCard

                    title="Bookings"

                    value={
                        stats.totalBookings
                    }

                />


                <StatCard

                    title="Revenue"

                    value={
                        `₹${stats.totalRevenue}`
                    }

                />


            </div>


            <RevenueChart

                data={
                    stats.monthlyRevenue
                }

            />


        </DashboardLayout>

    );

}