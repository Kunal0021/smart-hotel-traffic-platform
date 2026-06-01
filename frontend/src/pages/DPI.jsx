import { useEffect, useState } from "react";

import API from "../api/axios";
import socket from "../socket";

import DashboardLayout from "../layouts/DashboardLayout";


export default function DPI() {

    const [logs, setLogs] =
        useState([]);

    const [sourceIP, setSourceIP] =
        useState("");

    const [destination, setDestination] =
        useState("");

    const [protocol, setProtocol] =
        useState("HTTPS");

    const [bandwidth, setBandwidth] =
        useState("");



    useEffect(() => {

        fetchLogs();


        socket.on(
            "dpiAlert",
            (data) => {

                setLogs(
                    (prev) => [
                        data,
                        ...prev,
                    ]
                );

            }
        );


        return () => {

            socket.off(
                "dpiAlert"
            );

        };


    }, []);




    const fetchLogs = async () => {

        try {

            const { data } =
                await API.get(
                    "/dpi"
                );


            setLogs(
                data.logs
            );


        } catch (error) {

            console.log(error);

        }

    };




    const analyzeTraffic = async () => {

        try {

            await API.post(
                "/dpi/analyze",
                {
                    sourceIP,
                    destination,
                    protocol,
                    bandwidth:
                        Number(
                            bandwidth
                        ),
                }
            );


            setSourceIP("");
            setDestination("");
            setProtocol("HTTPS");
            setBandwidth("");


        } catch (error) {

            console.log(error);

        }

    };





    return (

        <DashboardLayout>


            <h1 className="text-3xl font-bold mb-6">

                DPI Traffic Monitoring

            </h1>




            {/* SIMULATOR */}

            <div className="bg-white p-5 rounded-xl shadow mb-6">


                <h2 className="text-xl font-bold mb-4">

                    Network Traffic Simulator

                </h2>



                <div className="grid grid-cols-5 gap-3">



                    <input

                        value={sourceIP}

                        onChange={
                            (e) =>
                                setSourceIP(
                                    e.target.value
                                )
                        }

                        placeholder="Source IP"

                        className="border p-2 rounded"

                    />




                    <input

                        value={destination}

                        onChange={
                            (e) =>
                                setDestination(
                                    e.target.value
                                )
                        }

                        placeholder="Destination"

                        className="border p-2 rounded"

                    />




                    <select

                        value={protocol}

                        onChange={
                            (e) =>
                                setProtocol(
                                    e.target.value
                                )
                        }

                        className="border p-2 rounded"

                    >


                        <option value="HTTPS">

                            HTTPS

                        </option>


                        <option value="FTP">

                            FTP

                        </option>



                        <option value="TOR">

                            TOR

                        </option>



                        <option value="UNKNOWN">

                            UNKNOWN

                        </option>


                    </select>





                    <input

                        value={bandwidth}

                        onChange={
                            (e) =>
                                setBandwidth(
                                    e.target.value
                                )
                        }

                        placeholder="Bandwidth MB"

                        className="border p-2 rounded"

                    />





                    <button

                        onClick={
                            analyzeTraffic
                        }

                        className="
                        bg-blue-600
                        text-white
                        rounded
                        "

                    >

                        Analyze

                    </button>



                </div>


            </div>





            {/* TABLE */}


            <div className="bg-white rounded-xl shadow overflow-hidden">


                <table className="w-full">


                    <thead>


                        <tr className="bg-slate-100">


                            <th className="p-3 text-left">

                                Source IP

                            </th>


                            <th>

                                Destination

                            </th>


                            <th>

                                Protocol

                            </th>


                            <th>

                                Bandwidth

                            </th>


                            <th>

                                Status

                            </th>


                        </tr>


                    </thead>





                    <tbody>


                        {

                            logs.map(

                                (log) => (


                                    <tr

                                        key={
                                            log._id
                                        }

                                        className="border-t"

                                    >



                                        <td className="p-3">


                                            {
                                                log.sourceIP
                                            }


                                        </td>




                                        <td>


                                            {
                                                log.destination
                                            }


                                        </td>




                                        <td>


                                            {
                                                log.protocol
                                            }


                                        </td>





                                        <td>


                                            {
                                                log.bandwidth
                                            } MB


                                        </td>





                                        <td className="font-bold">


                                            {
                                                log.status
                                            }


                                        </td>




                                    </tr>



                                )
                            )
                        }


                    </tbody>


                </table>


            </div>



        </DashboardLayout>

    );

}