import { useState } from "react";
import API from "../api";
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        console.log("Login Request Data:", form); 

        if (!form.username || !form.password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const res = await API.post('/login', form);
            console.log("Login Success Response:", res.data);

            localStorage.setItem('token', res.data.token);
            alert('Login Successful');
            setForm({ username: '', password: '' });
            navigate('/protected'); 
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <label>Username: </label>
                <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}/>
                <label>Password: </label>
                <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}