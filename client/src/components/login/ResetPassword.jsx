import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cktmbtn from "../buttons/cktmbtn";
import "./ResetPassword.css";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";

function ResetPassword() {
    const navigate = useNavigate();
    const {url} = useContext(ShopContext);
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const {token} = useParams();

    useEffect(() => {
        
        if (!token) {
            setMessage("Invalid or missing token");
        }
    }, []);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            console.log(token,"front token")
            let response = await fetch(`${url}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword:passwordData.newPassword })
            });
            let data = await response.json();
            if (!response.ok) {
            throw new Error(data.message || "An error occurred");
            }
            setMessage(data.message);
            if (data.success) {
            setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            setMessage(error.message || "An error occurred. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    return (
        <div className="resetPasswordPage">
            <form className="resetPasswordContainer" onSubmit={handleResetPassword}>
                <h2 className="form_heading">Reset Password</h2>
                {message && <p className="message">{message}</p>}
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    className="input"
                    minLength="6"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    minLength="6"
                    required
                />
                <Cktmbtn type="submit" title="Reset Password" style={{width:"22em",height:"40px",borderRadius:"27px"}}/>
            </form>
        </div>
    );
}

export default ResetPassword;
