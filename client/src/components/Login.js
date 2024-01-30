import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const serverUrl = 'http://localhost:3001/api'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate(); // Access to the history object

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                userEmail: email,
                userPassword: password,
            })
            if (response.status === 200) {
                // console.log("🚀 ~ handleLogin ~ response:", response)
                const { userEmail, userId } = response.data
                navigate('/useroptions', { state: { data: { userEmail, userId } } });
            }
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error)
        }
    }
    const handleRegisterUser = async () => {
        try {
            const response = await axios.post(`${serverUrl}/createuser`, {
                userEmail: email,
                userPassword: password
            })
            if (response.status === 201) {
                const { _id, userEmail } = response.data
                localStorage.setItem("userId", _id)
                localStorage.setItem("userEmail", userEmail)
                navigate("/useroptions")
            }

        } catch (error) {
            setErrorMessage(error.response.data)
            return
        }
    }

    return (
        <div className="login-container"> {/* Center the form */}
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="submit" onClick={handleRegisterUser}>Register</button>
                <br />
                <label>{errorMessage}</label>
            </form>
        </div>
    );
}
