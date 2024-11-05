import React from "react";
import "../styles/Login.css";
import RegisterPic from "../assets/register.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// login and register have same css style file
export default function Register() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	var navigate = useNavigate();
	return (
		<div className="login-container">
			<div className="login-img-container">
				<img
					src={RegisterPic}
					className="login-img-size"
					alt="login-picture "
				/>
			</div>
			<div className="login-form">
				<div className="login-heading">Welcome Back!</div>
				<input
					type="email"
					className="login-input"
					placeholder="Your  Userame"
					name="username"
					id=""
					value={user.username}
					onChange={handleChange}
				/>
				<input
					type="email"
					className="login-input"
					placeholder="Your Email address"
					name="email"
					id=""
					value={user.email}
					onChange={handleChange}
				/>
				<input
					type="email"
					className="login-input"
					placeholder="Your Password"
					name="password"
					id=""
					value={user.password}
					onChange={handleChange}
				/>
				<button className="login-btn" onClick={handleSubmit}>
					SIGN UP
				</button>
				<div className="already-account" onClick={handleLoginNavigate}>
					Already have an account.<span>LOGIN</span>{" "}
				</div>
			</div>
		</div>
	);
	function handleLoginNavigate() {
		navigate("/login");
	}
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	async function handleSubmit() {
		// console.log("user: "+user.username+user.email+user.password);

		try {
			var response = await axios.post(
				"http://localhost:8000/users/sign-up",
				user
			);
			response = response.data;
			alert(response.message);
			navigate("/login");
		} catch (error) {
			console.log(error.message);
			alert("Could not register user :( Try again later");
		}
	}
}
