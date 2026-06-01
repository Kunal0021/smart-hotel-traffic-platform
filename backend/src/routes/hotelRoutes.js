const express = require("express");

const router = express.Router();

const {
    createHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", getHotels);
router.get("/:id", getHotelById);

// Admin Routes
router.post(
    "/",
    protect,
    adminOnly,
    createHotel
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateHotel
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteHotel
);

module.exports = router;