import React from "react";
import "../styles/Login.css";
import LoginPic from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// login and register have same css style file

export default function Login() {
	var [user, setUser] = useState({
		password: "",
		email: "",
	});
	var navigate = useNavigate();
	return (
		<div className="login-container">
			<div className="login-img-container">
				<img src={LoginPic} className="login-img-size" alt="login-picture " />
			</div>
			<div className="login-form">
				<div className="login-heading">Welcome Back!</div>
				<input
					type="email"
					className="login-input"
					placeholder="Your Email address"
					name="email"
					id=""
					onChange={handleInput}
					value={user.email}
				/>
				<input
					type="password"
					className="login-input"
					placeholder="Your Password"
					name="password"
					value={user.password}
					id=""
					onChange={handleInput}
				/>
				<button className="login-btn" onClick={handleLogin}>
					LOGIN
				</button>
				<div className="tips">
					<div className="tips-text" onClick={handleSignUpNavigate}>
						Create an account
					</div>
					<div className="tips-text">Forgot Passoword</div>
				</div>
			</div>
		</div>
	);

	function handleSignUpNavigate() {
		navigate("/register");
	}

	async function handleLogin() {
		try {
			var response = await axios.post(
				"http://localhost:8000/users/login",
				user
			);

			const data = response.data;
			console.log("response= " + response.data);

			if (data.token) {
				localStorage.setItem("token", data.token);

				getUserDashboard();
			}
		} catch (error) {
			console.log(error);
			alert("Login failed: " + error);
		}
	}

	function handleInput(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	async function getUserDashboard() {
		const token = localStorage.getItem("token");

		try {
			const response = await axios.get(
				"http://localhost:8000/users/user-dashboard",
				{
					headers: {
						Authorization: token,
					},
				}
			);
			//note to get the data(content froom response ) do response.data but to check status simply use response.status and not response.data.status

			alert("Login successful");

			if (response.status === 200) {
				navigate("/dashboard");
			}

			if (response.status === 400 || response.status === 401) {
				alert("Login failed");
			}
		} catch (error) {
			alert("Error fetching dashboard");
			console.error(
				"Error fetching dashboard:",
				error.response ? error.response.data : error.message
			);
		}
	}
}
