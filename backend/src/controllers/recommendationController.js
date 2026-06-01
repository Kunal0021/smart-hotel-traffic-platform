const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");
const trafficData = require("../utils/trafficData");

const getRecommendations = async (
    req,
    res
) => {
    try {
        const {
            location,
            budget,
            minRating,
        } = req.body;

        const hotels = await Hotel.find();

        const recommendations = await Promise.all(
            hotels.map(async (hotel) => {
                let score = 0;
                let reasons = [];

                // Location Match
                if (
                    location &&
                    hotel.location
                        .toLowerCase()
                        .includes(location.toLowerCase())
                ) {
                    score += 40;
                    reasons.push("Location Match");
                }

                // Budget Match
                if (
                    budget &&
                    hotel.pricePerNight <= budget
                ) {
                    score += 30;
                    reasons.push("Within Budget");
                }

                // Rating Score
                score += (hotel.rating || 0) * 5;

                if (hotel.rating > 0) {
                    reasons.push(`Rating ${hotel.rating}`);
                }

                // Availability Score
                const availabilityScore = Math.min(
                    hotel.availableRooms,
                    20
                );

                score += availabilityScore;

                if (hotel.availableRooms > 20) {
                    reasons.push("High Availability");
                }

                // Minimum Rating Filter
                if (minRating && hotel.rating < minRating) {
                    score -= 50;
                }

                // Traffic Intelligence
                const trafficLevel = trafficData[hotel.location] || 5;
                const trafficPenalty = trafficLevel * 3;
                score -= trafficPenalty;

                if (trafficLevel <= 5) {
                    reasons.push("Low Traffic Area");
                }

                // Popularity Score
                const bookingCount = await Booking.countDocuments({
                    hotelId: hotel._id,
                    status: "confirmed",
                });

                score += bookingCount * 2;

                if (bookingCount > 0) {
                    reasons.push(`Popular Hotel(${bookingCount} bookings)`);
                }

                return {
                    hotel: {
                        _id: hotel._id,
                        name: hotel.name,
                        location: hotel.location,
                        pricePerNight: hotel.pricePerNight,
                        rating: hotel.rating,
                        availableRooms: hotel.availableRooms,
                    },
                    score,
                    reasons,
                };
            })
        );

        recommendations.sort((a, b) => b.score - a.score);

        res.json({
            success: true,
            totalRecommendations: recommendations.length,
            recommendations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getRecommendations,
};
