import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../Context/AuthContext";


export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");


    const submitHandler = async (e) => {

        e.preventDefault();

        console.log(
            "BUTTON CLICKED"
        );


        try {

            console.log(
                "Sending request..."
            );


            const response =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );


            console.log(
                "LOGIN RESPONSE:",
                response.data
            );


            login(
                response.data.token
            );


            console.log(
                "TOKEN SAVED:",
                localStorage.getItem(
                    "token"
                )
            );


            navigate(
                "/dashboard"
            );


        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data ||
                error.message
            );

        }

    };


    return (

        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={submitHandler}

                className="
                bg-white 
                shadow 
                p-8 
                rounded-xl
                "
            >

                <h1 className="text-2xl font-bold mb-5">
                    Login
                </h1>


                <input

                    className="border p-2 mb-3 block"

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={
                        (e) =>
                            setEmail(
                                e.target.value
                            )
                    }

                />


                <input

                    className="border p-2 mb-3 block"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        (e) =>
                            setPassword(
                                e.target.value
                            )
                    }

                />


                <button

                    type="submit"

                    className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded
                    "
                >

                    Login

                </button>


            </form>

        </div>
    );
}