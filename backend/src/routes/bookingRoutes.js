const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createBooking,
    getMyBookings,
    cancelBooking,
    getAllBookings,
} = require("../controllers/bookingController");

// User Routes
router.post(
    "/",
    protect,
    createBooking
);

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);

router.put(
    "/:id/cancel",
    protect,
    cancelBooking
);

// Admin Route
router.get(
    "/",
    protect,
    adminOnly,
    getAllBookings
);

module.exports = router;