const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

/*
CREATE BOOKING
POST /api/bookings
Protected Route
*/



const createBooking = async (req, res) => {
    try {
        const {
            hotelId,
            checkInDate,
            checkOutDate,
            roomsBooked,
        } = req.body;

        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        if (hotel.availableRooms < roomsBooked) {
            return res.status(400).json({
                success: false,
                message: "Not enough rooms available",
            });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const nights = Math.ceil(
            (checkOut - checkIn) /
            (1000 * 60 * 60 * 24)
        );

        if (nights <= 0) {
            return res.status(400).json({
                success: false,
                message:
                    "Check-out date must be after check-in date",
            });
        }

        const totalPrice =
            nights *
            roomsBooked *
            hotel.pricePerNight;

        const booking = await Booking.create({
            userId: req.user._id,
            hotelId,
            checkInDate,
            checkOutDate,
            roomsBooked,
            totalPrice,
        });

        hotel.availableRooms -= roomsBooked;
        await hotel.save();

        const io =
            req.app.get("io");


        io.emit(
            "newBooking",
            {
                message:
                    "New booking created",
                booking,
            }
        );

        res.status(201).json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
MY BOOKINGS
GET /api/bookings/my-bookings
Protected Route
*/
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.user._id,
        })
            .populate("hotelId")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
CANCEL BOOKING
PUT /api/bookings/:id/cancel
Protected Route
*/
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(
            req.params.id
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        if (
            booking.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Booking already cancelled",
            });
        }

        booking.status = "cancelled";
        await booking.save();

        const hotel = await Hotel.findById(
            booking.hotelId
        );

        hotel.availableRooms += booking.roomsBooked;
        await hotel.save();

        res.json({
            success: true,
            message: "Booking cancelled successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
ADMIN VIEW ALL BOOKINGS
GET /api/bookings
Admin Route
*/
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email")
            .populate("hotelId", "name location")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
    getAllBookings,
};