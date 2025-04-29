import React, { useContext, useState } from 'react';
import './Login.css'
import { AdminContext } from '../../Context/AdminContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // const [userData, setUserData] = useState(null);
    const {url,setUser,user} = useContext(AdminContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await fetch(`${url}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                setErrorMsg(data.message || 'Login failed.');
                return;
            }
            
            // Optionally: Store token in localStorage or state
            console.log('Token:', data.token);
            localStorage.setItem('auth-token', data.token);
            setUser(data.user);
            console.log(data.user,"user",data)
             // Navigate based on the role
        switch (`${data.user.role}`) {
            case 'manager':
              window.location.replace('/');
              break;
            case 'admin':
              window.location.replace('/');
              break;
            case 'delivery boy':
              window.location.replace('/delivery-dashboard');
              break;
            case 'clerk':
                window.location.replace('/assigndelivery');
                break;
            default:
              window.location.replace('/login'); 
              break;
          }
        } catch (error) {
            setErrorMsg('Server error. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="ai-login-container">
            <h2 className="ai-login-title">Admin Login</h2>
            {errorMsg && <p className="ai-login-error">{errorMsg}</p>}
            <form className="ai-login-form" onSubmit={handleSubmit}>
                <div className="ai-login-field">
                    <label className="ai-login-label" htmlFor="ai-email-input">Email</label>
                    <input
                        id="ai-email-input"
                        type="email"
                        className="ai-login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="ai-login-field">
                    <label className="ai-login-label" htmlFor="ai-password-input">Password</label>
                    <input
                        id="ai-password-input"
                        type="password"
                        className="ai-login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="ai-login-button">Login</button>
            </form>
            {user && (
                <div className="ai-login-success">
                    <h3>Welcome, {user.name || user.email}</h3>
                    {/* Further actions like navigation can be added here */}
                </div>
            )}
        </div>
    );
}