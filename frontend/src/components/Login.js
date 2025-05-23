import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [form, setform] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        setform({ username: '', password: '' });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/login', form);
            localStorage.setItem('token', res.data.token);
            alert('Login Successful');
            setform({ username: '', password: '' });
            navigate('/protected');
        } catch {
            alert('Login failed');
            setform({ username: '', password: '' });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <h2>Login</h2>
                <label>Username: </label>
                <input type="text" placeholder="Username" value={form.username} onChange={e => setform({ ...form, username: e.target.value })}/>
                <label>Password: </label>
                <input type="password" placeholder="Password" value={form.password} onChange={e => setform({ ...form, password: e.target.value })}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
