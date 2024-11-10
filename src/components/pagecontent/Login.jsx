import { useState } from 'react';
import '../Css/Login.css';
import axios from 'axios';
import video from "/src/assets/LoginVideo.mp4"
import Transition from "../sharedlayout/Transition.jsx";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const info = {
            name,
            password
        };

        try {
            const response = await axios.post("/api/login", info);
            const { token, refreshToken } = response.data;

            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('refreshToken', refreshToken);
            setError("Login successful");

            setIsTransitioning(true);

        } catch (error) {
            setError('Login failed. Please try again later.');
            console.error('Error:', error);
        }
    };

    if (isTransitioning) {
        return <Transition />;
    }

    return (
        <div className="page-wrap">
            <video src={video} autoPlay loop muted />
            <div className="login-wrap">
                <div className="login-html">
                    <h2 className="tab">Sign In</h2>
                    <div className="login-form">
                        <form onSubmit={handleLogin} className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input
                                    id="user"
                                    type="text"
                                    className="input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input
                                    id="pass"
                                    type="password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In"/>
                            </div>
                            {error && <p className="error">{error}</p>}
                            <div className="hr"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
