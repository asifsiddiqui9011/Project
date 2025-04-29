
// import { Link, useNavigate } from "react-router-dom";
// import Cktmbtn from "../buttons/cktmbtn";
// import "./login.css";
// import GoogleBtn from "./GoogleLoginBtn";
// import { ImCross } from "react-icons/im";
// import { useState, useContext } from "react";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { ShopContext } from "../../context/shopContext";

// function LoginPage() {
//     const { url } = useContext(ShopContext);
//     const navigate = useNavigate();
//     const [loginData, setLoginData] = useState({
//         username: "",
//         password: "",
//         email: "",
//         profileImage: ""
//     });

//     const loginn = async () => {
//         console.log("Login Function Executed", loginData);
//         let responseData;
//         await fetch(`${url}/login`, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(loginData),
//         }).then((response) => response.json()).then((data) => responseData = data);

//         if (responseData.success) {
//             localStorage.setItem('auth-token', responseData.token);
//             window.location.replace("/home");
//         } else {
//             alert(responseData.errors);
//         }
//     };

//     const loginchangeHandler = (e) => {
//         setLoginData({ ...loginData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="signupPage">
//             <div className="form_container">
//                 <div className="left">
//                     <img className="loginimg" src="./loginimg.png" alt="Login" />
//                 </div>
//                 <div className="Right">
//                     <div className="Crossbtn">
//                         <Link to="/home"><ImCross className="CrossIcon" /></Link>
//                     </div>
//                     <div className="right">
//                         <h2 className="from_heading">Members Log in</h2>
//                         <input name='email' value={loginData.email} onChange={loginchangeHandler} type="email" className="input" placeholder="Email" />
//                         <input name='password' value={loginData.password} onChange={loginchangeHandler} type="password" className="input" placeholder="Password" />
//                         <div className="forgot-password-container">
//                             <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
//                         </div>
//                         <Cktmbtn onClick={loginn} title="Login" />
//                         <p className="text">or</p>
//                         <GoogleOAuthProvider clientId="930966048669-nll664mhi690t8mqsbnp69q18ubvkk11.apps.googleusercontent.com">
//                             <GoogleBtn />
//                         </GoogleOAuthProvider>
//                         <p className="text">
//                             New Here? <Link to="/signup">SignUp</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;




import { Link, useNavigate } from "react-router-dom";
import Cktmbtn from "../buttons/cktmbtn";
import "./login.css";
import GoogleBtn from "./GoogleLoginBtn";
import { ImCross } from "react-icons/im";
import { useState, useContext } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ShopContext } from "../../context/shopContext";

function LoginPage() {
    const { url } = useContext(ShopContext);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!loginData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!loginData.password) {
            newErrors.password = "Password is required.";
        }
        return newErrors;
    };

    const loginn = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        console.log("Login Function Executed", loginData);
        let responseData;
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            responseData = await response.json();
        } catch (error) {
            alert("An error occurred. Please try again later.");
            return;
        }

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate("/home");
        } else {
            alert(responseData.errors || "Login failed");
        }
    };

    const loginchangeHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <div className="signupPage">
            <div className="form_container">
                <div className="left">
                    <img className="loginimg" src="./loginimg.png" alt="Login" />
                </div>
                <div className="Right">
                    <div className="Crossbtn">
                        <Link to="/home"><ImCross className="CrossIcon" /></Link>
                    </div>
                    <div className="right">
                        <h2 className="from_heading">Members Log in</h2>
                        <form onSubmit={loginn}>
                            <div className="form_field">
                                <input
                                    name="email"
                                    type="email"
                                    className="input"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={loginchangeHandler}
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="form_field">
                                <input
                                    name="password"
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={loginchangeHandler}
                                    required
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className="forgot-password-container">
                                <Link className="forgot-password" to="/forgot-password">Forgot Password?</Link>
                                <Link to="/signup">SignUp</Link>
                            </div>
                            <Cktmbtn type="submit" title="Login" style={{width:"20em",height:"40px",borderRadius:"20px",fontSize:"16px"}} />
                        </form>
                        <p className="text">or</p>
                        <GoogleOAuthProvider clientId= {process.env.VITE_GOOGLE_CLIENT_ID}>
                            <GoogleBtn />
                        </GoogleOAuthProvider>
                        {/* <p className="text">
                            New Here? <Link to="/signup">SignUp</Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
