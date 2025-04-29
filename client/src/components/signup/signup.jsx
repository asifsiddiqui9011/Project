// import { Link } from "react-router-dom";
// import "./signup.css";
// import Cktmbtn  from "../buttons/cktmbtn";
// import GoogleBtn from "../login/GoogleLoginBtn";
// import { ImCross } from "react-icons/im";
// import { useContext, useState } from "react";
// import { ShopContext } from "../../context/shopContext";

// function Signup() {
    
// 	const {url} = useContext(ShopContext)
// 	const [signupData,setSignupData] = useState({
// 		username:"",
// 		password:"",
// 		email:"",
// 		profileImage:""
// 	})

// 	const signup = async () =>{
// 		//console.log("signup Function Executed",signupData);
// 		let responseData;
// 		await fetch(`${url}/signup`,{
// 			method:'POST',
// 			headers:{
// 				Accept:'application/form-data',
// 				'Content-Type':'application/json',
// 			},
// 			body:JSON.stringify(signupData),
// 		}).then((response)=>response.json()).then((data)=>responseData=data)

// 		if(responseData.success){
// 			localStorage.setItem('auth-token',responseData.token);
// 			window.location.replace("/home");
// 		}else{
// 			alert(responseData.errors );
// 		}
// 	}
	
// 	const changeHandler = (e) =>{
// 		setSignupData({...signupData,[e.target.name]:e.target.value})
// 	}

// 	return (
// 			<div className="signupPage">
// 		<div className="signupform_container">
// 				<div className="signupleft">
// 					<img className="imgsign" src="./signupimg.png" alt="signup" />
// 				</div>
// 				<div className="signupright">
// 					<div id="signupicon">
//                     <h2 className="from_heading">Create Account </h2>
// 					<Link to="/home"><ImCross className="CrossIcon"/></Link>  
// 					</div>
					
// 						<input name='username' value={signupData.username} onChange={changeHandler} type="text" className="input" placeholder="Username" />
// 						<input name='email' value={signupData.email} onChange={changeHandler} type="email" className="input" placeholder="Email" />
// 						<input name='password' value={signupData.password} onChange={changeHandler}
// 							type="password"
// 							className="input"
// 							placeholder="Password"
// 						/>
// 						<Cktmbtn onClick={signup} title="Signup"/>
// 						<p className="text">or</p>
// 						{/* <GoogleBtn/> */}
// 						<p className="text">
// 							Already Have Account ? <Link to="/login">Log In</Link>
// 						</p>
// 				   </div>
// 			    </div>
// 		</div>
// 	);
// }

// export default Signup;





import { Link } from "react-router-dom";
import "./signup.css";
import Cktmbtn  from "../buttons/cktmbtn";
import GoogleBtn from "../login/GoogleLoginBtn";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext";

function Signup() {
	
	const { url } = useContext(ShopContext);
	const [signupData, setSignupData] = useState({
		username: "",
		email: "",
		password: "",
		mobile: "",
		profileImage: ""
	});
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		// Validate username
		if (!signupData.username.trim()) {
			newErrors.username = "Username is required";
		}

		// Validate email
		const emailRegex = /^[a-z][^\s@]*@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(signupData.email)) {
			newErrors.email = "Invalid email address";
		}

		// Validate password (min 6 characters)
		if (signupData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
		}

		// Validate mobile (exactly 10 digits)
		const mobileRegex = /^\d{10}$/;
		if (!mobileRegex.test(signupData.mobile)) {
			newErrors.mobile = "Mobile number must be exactly 10 digits";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const signup = async (e) => {
		e.preventDefault();
		if (!validate()) {
			alert(Object.values(errors).join("\n"));
			return;
		}
		let responseData;
		await fetch(`${url}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/form-data',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(signupData),
		})
			.then((response) => response.json())
			.then((data) => (responseData = data));

		if (responseData.success) {
			localStorage.setItem('auth-token', responseData.token);
			window.location.replace("/home");
		} else {
			alert(responseData.errors);
		}
	};

	const changeHandler = (e) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

	return (
		<div className="signupPage">
			<div className="signupform_container">
				<div className="signupleft">
					<img className="imgsign" src="./signupimg.png" alt="signup" />
				</div>
				<div className="signupright">
					<div id="signupicon">
					<h2 className="from_heading">Create Account </h2>
						<Link to="/home"><ImCross className="CrossIcon"/></Link>  
					</div>
					<form onSubmit={signup}>
						<input
							name="username"
							value={signupData.username}
							onChange={changeHandler}
							type="text"
							className="input"
							placeholder="Username"
			  // Validation: at least 4 characters and no digits allowed
							pattern="^(?!.*\d).{4,}$"
							title="Username must be at least 4 characters long and must not contain digits"
							required
						/>
						{errors.username && <span className="error">{errors.username}</span>}
						<input
							name="email"
							value={signupData.email}
							onChange={changeHandler}
							type="email"
							className="input"
							placeholder="Email"
							required
							pattern="^[A-Za-z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$"
							title="Email must start with a letter and be a valid email address"
						/>
						{errors.email && <span className="error">{errors.email}</span>}
						<input
							name="mobile"
							value={signupData.mobile}
							onChange={changeHandler}
							type="text"
							className="input"
							placeholder="Mobile Number"
							required
							pattern="^[6-9]\d{9}$"
							title="Mobile number must be 10 digits and start with 6,7,8, or 9"
						/>
						{errors.mobile && <span className="error">{errors.mobile}</span>}
						<input
							name="password"
							value={signupData.password}
							onChange={changeHandler}
							type="password"
							className="input"
							placeholder="Password"
							required
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$"
							title="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
						/>
						{errors.password && <span className="error">{errors.password}</span>}
						<Cktmbtn type="submit" title="Signup" style={{width:"20em",height:"40px",fontSize:"16px",borderRadius:"20px"}} />
					</form>
					
					<p className="text">or</p>
					<GoogleBtn/>
					<p className="text">
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
