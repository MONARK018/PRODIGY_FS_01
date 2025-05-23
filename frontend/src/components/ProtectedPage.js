import { useEffect, useState } from "react";
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProtectedPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {   
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError("No authentication token found.");
            setLoading(false);
            return;
        }

        console.log("Using Token:", token); 

        API.get('/protected', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setData(res.data.message))
        .catch(err => {
            console.error("API Error:", err.response ? err.response.data : err.message);
            setError("Access Denied: Invalid token or permissions.");
        })
        .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    return (
        <div>
            <h2>Protected Page</h2>
            {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : <p>{data}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}