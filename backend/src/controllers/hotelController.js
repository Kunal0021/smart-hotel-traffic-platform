const Hotel = require("../models/Hotel");

const createHotel = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);

        res.status(201).json({
            success: true,
            hotel,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getHotels = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const query = {};

        if (req.query.location) {
            query.location = {
                $regex: req.query.location,
                $options: "i",
            };
        }

        if (req.query.minPrice || req.query.maxPrice) {
            query.pricePerNight = {};

            if (req.query.minPrice) {
                query.pricePerNight.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                query.pricePerNight.$lte = Number(req.query.maxPrice);
            }
        }

        const skip = (page - 1) * limit;

        const hotels = await Hotel.find(query)
            .skip(skip)
            .limit(limit);

        const total = await Hotel.countDocuments(query);

        res.json({
            success: true,
            page,
            total,
            hotels,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        res.json({
            success: true,
            hotel,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        res.json({
            success: true,
            hotel,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        res.json({
            success: true,
            message: "Hotel deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createHotel,
    getHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
};