import React from "react";
import "../styles/Sidebar.css";

import { useState } from "react";
import CartPopup from "./CartPopup";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import DashboardLogo from "../assets/dashboardLogo.png";

function Sidebar({ role }) {
	const [isCartPopupVisible, setisCartPopupVisible] = useState(false);

	var navigate = useNavigate();

	return (
		<div className="sidebar">
			<div className="sidebar-logo">
				<img src={DashboardLogo} alt="Lilies Logo" />
				<div>&nbsp;Lilies</div>
			</div>
			<ul className="sidebar-menu">
				<li className="sidebar-item">
					<FontAwesomeIcon icon={faHouse} />
					<span>Dashboard</span>
				</li>
				<li className="sidebar-item" onClick={handlePersonalDetails}>
					<FontAwesomeIcon icon={faUser} />
					<span>Your Profile</span>
				</li>
				<li className="sidebar-item" onClick={handleOrders}>
					<FontAwesomeIcon icon={faCookieBite} />
					<span>Orders</span>
				</li>
				<li className="sidebar-item" onClick={handleCart}>
					<FontAwesomeIcon icon={faCartShopping} />
					<span>Your Cart</span>
				</li>
				{role === "Admin" && (
					<li className="sidebar-item" onClick={handleAdminClick}>
						<FontAwesomeIcon icon={faLock} />

						<span>Admin Roles</span>
					</li>
				)}

				<li className="sidebar-item" onClick={handleLogout}>
					<FontAwesomeIcon icon={faRightFromBracket} />
					<span>Log out</span>
				</li>
			</ul>
			{isCartPopupVisible && <CartPopup onClose={closePopup} />}
		</div>
	);
	function handleCart() {
		setisCartPopupVisible(true);
	}
	function closePopup() {
		setisCartPopupVisible(false);
	}

	function handlePersonalDetails() {
		navigate("/personal-details");
	}
	function handleOrders() {
		navigate("/orders");
	}
	function handleAdminClick() {
		navigate("/user-list");
	}
	function handleLogout() {
		localStorage.removeItem("token");
		alert("You have been logged out.");

		navigate("/login");
	}
}

export default Sidebar;
