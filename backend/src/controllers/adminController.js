const User = require("../models/User");
const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers =
            await User.countDocuments();

        const totalHotels =
            await Hotel.countDocuments();

        const totalBookings =
            await Booking.countDocuments();

        const confirmedBookings =
            await Booking.countDocuments({
                status: "confirmed",
            });

        const cancelledBookings =
            await Booking.countDocuments({
                status: "cancelled",
            });

        const revenueData =
            await Booking.aggregate([
                {
                    $match: {
                        status: "confirmed",
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$totalPrice",
                        },
                    },
                },
            ]);

        const totalRevenue =
            revenueData[0]?.totalRevenue || 0;

        const monthlyRevenue =
            await Booking.aggregate([
                {
                    $match: {
                        status: "confirmed",
                    },
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $month:
                                    "$createdAt",
                            },
                        },
                        revenue: {
                            $sum:
                                "$totalPrice",
                        },
                    },
                },
                {
                    $sort: {
                        "_id.month": 1,
                    },
                },
            ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalHotels,
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                totalRevenue,
                monthlyRevenue,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};