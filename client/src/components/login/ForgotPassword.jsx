import { useState, useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import { useNavigate } from "react-router-dom";
import Cktmbtn from "../buttons/cktmbtn";
import "./ForgotPassword.css";

function ForgotPassword() {
    const { url } = useContext(ShopContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            let response = await fetch(`${url}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            });
            let data = await response.json();
            setMessage(data.message);
            if (data.success) {
            setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            setMessage(error.message || "An error occurred. Please try again later.");
        }
    };

    return (
        <div className="forgotPasswordPage">
            <div className="forgotPasswordContainer">
                <h2 className="form_heading">Forgot Password</h2>
                  {message && <p className="message">!{message}</p>}
                <input
                    type="email"
                    placeholder="Enter your email example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
                <Cktmbtn onClick={handleForgotPassword} title="Submit" style={{width:"20em"}} />
               
                <p className="back_to_login">
                    <a onClick={() => navigate("/login")} className="back-link">Back to Login</a>
                </p>
            </div>
           
        </div>
    );
}

export default ForgotPassword;
