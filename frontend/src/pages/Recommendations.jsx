import { useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";


export default function Recommendations() {

    const [location, setLocation] =
        useState("");

    const [budget, setBudget] =
        useState("");

    const [hotels, setHotels] =
        useState([]);



    const getRecommendations = async () => {

        const { data } =
            await API.post(
                "/recommendations",
                {
                    location,
                    budget:
                        Number(budget),
                }
            );


        setHotels(
            data.recommendations
        );
    };



    return (

        <DashboardLayout>


            <h1 className="text-3xl font-bold mb-5">

                AI Hotel Recommendations

            </h1>


            <div className="bg-white p-5 rounded-xl shadow mb-5">


                <input

                    placeholder="Preferred Location"

                    className="border p-2 mr-3"

                    onChange={
                        (e) =>
                            setLocation(
                                e.target.value
                            )
                    }

                />


                <input

                    placeholder="Budget"

                    className="border p-2 mr-3"

                    onChange={
                        (e) =>
                            setBudget(
                                e.target.value
                            )
                    }

                />



                <button

                    onClick={
                        getRecommendations
                    }

                    className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                    "
                >

                    Get AI Suggestions

                </button>


            </div>




            <div className="space-y-4">


                {
                    hotels.map(
                        (item) => (

                            <div

                                key={
                                    item.hotel._id
                                }

                                className="
                        bg-white
                        shadow
                        rounded-xl
                        p-5
                        "

                            >


                                <h2 className="text-xl font-bold">

                                    {
                                        item.hotel.name
                                    }

                                </h2>



                                <p>

                                    Location:
                                    {" "}
                                    {
                                        item.hotel.location
                                    }

                                </p>


                                <p>

                                    Price:
                                    ₹{
                                        item.hotel.pricePerNight
                                    }

                                </p>



                                <p className="font-bold text-green-600">

                                    AI Score:
                                    {
                                        item.score
                                    }

                                </p>


                                <p>

                                    Why Recommended:
                                    {" "}
                                    {
                                        item.reason
                                    }

                                </p>


                            </div>


                        )
                    )
                }


            </div>


        </DashboardLayout>

    );
}