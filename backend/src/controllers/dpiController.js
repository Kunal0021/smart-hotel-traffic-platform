const TrafficLog =
    require("../models/TrafficLog");


const analyzeTraffic =
    async (req, res) => {

        try {

            const {
                sourceIP,
                destination,
                protocol,
                bandwidth
            } = req.body;


            let status = "NORMAL";


            if (bandwidth > 500) {

                status = "HIGH_TRAFFIC";

            }


            if (
                protocol === "TOR" ||
                protocol === "UNKNOWN"
            ) {

                status = "SUSPICIOUS";

            }


            const log =
                await TrafficLog.create({

                    sourceIP,
                    destination,
                    protocol,
                    bandwidth,
                    status

                });


            const io =
                req.app.get("io");


            io.emit(
                "dpiAlert",
                log
            );


            res.json({
                success: true,
                log
            });


        }

        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };



const getTrafficLogs =
    async (req, res) => {

        const logs =
            await TrafficLog.find()
                .sort({
                    createdAt: -1
                });


        res.json({
            success: true,
            logs
        });

    };


module.exports = {
    analyzeTraffic,
    getTrafficLogs
};