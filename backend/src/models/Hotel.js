const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        pricePerNight: {
            type: Number,
            required: true,
        },

        availableRooms: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
        },

        amenities: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Hotel", hotelSchema);