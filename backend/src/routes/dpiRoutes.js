const express =
    require("express");

const router =
    express.Router();


const {
    analyzeTraffic,
    getTrafficLogs
} =
    require("../controllers/dpiController");


router.post(
    "/analyze",
    analyzeTraffic
);


router.get(
    "/",
    getTrafficLogs
);


module.exports =
    router;