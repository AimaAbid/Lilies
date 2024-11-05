import React from "react";
import Sidebar from "../Components/Sidebar";
import "../styles/Dashboard.css";
import ItemCard from "../Components/ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Default from "../assets/defaultUser.webp";

export default function Dashboard() {
	var [items, setItems] = useState([]);
	var [user, setUser] = useState({
		username: "",
		image: "",
		role: "",
	});

	useEffect(() => {
		getItems();
		getUser();
	}, []);
	const disabled = false;
	async function getItems() {
		var response = await axios.get("http://localhost:8000/items/");
		setItems(response.data);
	}

	async function getUser() {
		var response = await axios.get("http://localhost:8000/users/get-user", {
			headers: { authorization: localStorage.getItem("token") },
		});
		setUser(response.data);
	}
	return (
		<div className="dashboard-main-container">
			<Sidebar role={user.role} />

			<div className="dashboard-main-content">
				{/* head-section */}
				<section className="dashboard-header">
					<div>
						<div className="dashboard-welcome-text">
							Good morning, {user.username}!
						</div>
						<div className="dashboard-light-text">
							What delicious meal are you craving today?
						</div>
					</div>
					<div>
						<img
							src={
								user.image
									? `http://localhost:8000/assets/${user.image}`
									: Default
							}
							alt="profile pic"
							className="dashboard-profile-pic-style"
						/>
					</div>
				</section>

				<section className="item-card-list">
					{items.map((item) => (
						<ItemCard
							name={item.name}
							description={item.description}
							price={item.price}
							itemId={item._id}
							image={item.image}
							disabled={disabled}
						/>
					))}
				</section>
			</div>
		</div>
	);
}
