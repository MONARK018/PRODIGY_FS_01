import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Register.css';

export default function Register() {
    const [form, setform] = useState(() => ({ username: '', password: '' }));
    const navigate = useNavigate();

    useEffect(() => {
        setform({ username: '', password: '' });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/register', form);
            alert('User Registered!');
            setform({ username: '', password: '' });
            navigate('/login');
        } catch {
            alert('Registration failed');
        }
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                 <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" placeholder="Username" value={form.username} onChange={e => setform({ ...form, username: e.target.value })}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" placeholder="Password" value={form.password} onChange={e => setform({ ...form, password: e.target.value })}/>
                </div>
                <button type="submit">Sign up</button>
            </form>

            <div className="login-redirect">
                <p>Already have an account?</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
}