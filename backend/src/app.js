const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi =
    require("swagger-ui-express");

const swaggerSpecs =
    require("./config/swagger");

const app = express();

// Middleware
app.use(
    cors({
        origin:
            "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const hotelRoutes = require("./routes/hotelRoutes");

app.use("/api/hotels", hotelRoutes);

const bookingRoutes =
    require("./routes/bookingRoutes");

app.use(
    "/api/bookings",
    bookingRoutes
);

const adminRoutes =
    require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerSpecs
    )
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Hotel Backend Running",
    });
});

const recommendationRoutes =
    require(
        "./routes/recommendationRoutes"
    );

app.use(
    "/api/recommendations",
    recommendationRoutes
);

module.exports = app;