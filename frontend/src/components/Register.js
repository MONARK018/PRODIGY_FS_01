import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" }); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        console.log("Form Data Sent:", form); 

        if (!form.username || !form.email || !form.password) {
            setError("All fields (username, email, password) are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await API.post("/register", form);
            alert("User Registered!");
            setForm({ username: "", email: "", password: "", role: "user" });
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                {error && <p className="error-message">{error}</p>}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>

            <div className="login-redirect">
                <p>Already have an account?</p>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    );
}