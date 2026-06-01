import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        console.log("BUTTON CLICKED");

        try {
            console.log("Sending request...");

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            login(response.data.token);

            console.log(
                "TOKEN SAVED:",
                localStorage.getItem("token")
            );

            navigate("/dashboard");

        } catch (error) {
            console.log(
                "LOGIN ERROR:",
                error.response?.data || error.message
            );
            setErrorMsg(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Invalid credentials. Please verify your email and password."
            );
        }
    };

    return (
        <div className="login-page-container">
            {/* Left Illustration Zone */}
            <div className="login-illustration-side">
                {/* Logo */}
                <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="login-logo-container">
                    <div className="login-logo-icon">H</div>
                    <span className="login-logo-text">SMART HOTEL</span>
                </a>

                {/* Twinkling Background elements */}
                <svg className="twinkle-star star-1 animate-twinkle-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
                <svg className="twinkle-star star-2 animate-twinkle-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
                <svg className="twinkle-star star-3 animate-twinkle-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
                <svg className="twinkle-star star-4 animate-twinkle-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>

                {/* Geometric Characters Composition */}
                <div className="character-composition-box">
                    {/* Character 1: Purple Pill */}
                    <div className="geo-character char-purple animate-float-1">
                        <div className="kawaii-face">
                            <div className="kawaii-eye left">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-eye right">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-smile"></div>
                        </div>
                    </div>

                    {/* Character 2: Charcoal Pill */}
                    <div className="geo-character char-charcoal animate-float-2">
                        <div className="kawaii-face">
                            <div className="kawaii-eye left">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-eye right">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-smile"></div>
                        </div>
                    </div>

                    {/* Character 3: Orange Semi-Circle */}
                    <div className="geo-character char-orange animate-float-3">
                        <div className="kawaii-face">
                            <div className="kawaii-eye left">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-eye right">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-smile"></div>
                        </div>
                    </div>

                    {/* Character 4: Yellow Rounded Pill */}
                    <div className="geo-character char-yellow animate-float-4">
                        <div className="kawaii-face">
                            <div className="kawaii-eye left">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-eye right">
                                <div className="kawaii-eye-reflection"></div>
                            </div>
                            <div className="kawaii-smile"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Login Form Side */}
            <div className="login-form-side">
                <div className="login-form-wrapper">
                    {/* Welcome Header */}
                    <h1 className="login-title-h1">Welcome back!</h1>
                    <p className="login-subtitle">Please enter your details to sign in to your account.</p>

                    {/* Error message banner */}
                    {errorMsg && (
                        <div style={{
                            padding: "12px 16px",
                            backgroundColor: "#FEE2E2",
                            border: "1px solid #FCA5A5",
                            borderRadius: "12px",
                            color: "#B91C1C",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "24px"
                        }}>
                            {errorMsg}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submitHandler} className="login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <div className="input-container">
                                <input
                                    id="email"
                                    className="form-input"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="input-container">
                                <input
                                    id="password"
                                    className="form-input"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="buttons-group">
                            <button type="submit" className="primary-btn">
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="secondary-btn"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>

                    <div className="login-footer-links">
                        <span>Don't have an account?</span>
                        <a href="/register" onClick={(e) => { e.preventDefault(); navigate("/register"); }} className="login-footer-link">
                            Sign up for free
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
