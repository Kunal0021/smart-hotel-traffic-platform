import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
        });

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                "/auth/register",
                formData
            );

            alert(
                "Registration Successful"
            );

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message
            );
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={submitHandler}>
                <input
                    placeholder="Name"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name:
                                e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email:
                                e.target.value,
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password:
                                e.target.value,
                        })
                    }
                />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}