import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } =
                await API.get("/bookings");

            setBookings(data.bookings);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">
                Booking Management
            </h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="p-4 text-left">
                                User
                            </th>

                            <th className="p-4 text-left">
                                Hotel
                            </th>

                            <th className="p-4 text-left">
                                Rooms
                            </th>

                            <th className="p-4 text-left">
                                Total Price
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking._id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    {
                                        booking.userId
                                            ?.name
                                    }
                                </td>

                                <td className="p-4">
                                    {
                                        booking.hotelId
                                            ?.name
                                    }
                                </td>

                                <td className="p-4">
                                    {
                                        booking.roomsBooked
                                    }
                                </td>

                                <td className="p-4">
                                    ₹
                                    {
                                        booking.totalPrice
                                    }
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${booking.status ===
                                                "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {
                                            booking.status
                                        }
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}