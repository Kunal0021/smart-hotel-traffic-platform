const mongoose = require("mongoose");


const trafficLogSchema =
    new mongoose.Schema(
        {

            sourceIP: {
                type: String,
                required: true,
            },


            destination: {
                type: String,
            },


            protocol: {
                type: String,
            },


            bandwidth: {
                type: Number,
            },


            status: {
                type: String,
                enum: [
                    "NORMAL",
                    "HIGH_TRAFFIC",
                    "SUSPICIOUS",
                ],
                default: "NORMAL",
            },


        },
        {
            timestamps: true
        }
    );


module.exports =
    mongoose.model(
        "TrafficLog",
        trafficLogSchema
    );