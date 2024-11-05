import React from "react";
import Logo from "../assets/Logo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="nav-container">
			<div>
				<img src={Logo} alt="logo" className="navbar-logo" />
				<div className="nav-brand">&nbsp;Lilies</div>
			</div>
			<div>
				<div className="nav-home">
					<Link to="/menu">Menu</Link>
				</div>
				<div className="nav-signup">
					<Link to="login">Login</Link>
				</div>
				<div className="nav-login-btn">
					<Link to="register">Sign Up</Link>
				</div>
			</div>
		</div>
	);
}
