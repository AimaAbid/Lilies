import React from "react";
import ItemCard from "../Components/ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
//css from dashboard.css
export default function Dashboard() {
	var [items, setItems] = useState([]);

	useEffect(() => {
		getItems();
	}, []);

	const disabled = true;

	async function getItems() {
		var response = await axios.get("http://localhost:8000/items/");
		setItems(response.data);
	}

	return (
		// style from dashboard.css
		<div className="menu-container">
			<p>Menu Page</p>
			<div className="dashboard-welcome-text">Good morning, our guest!</div>
			<div className="dashboard-light-text">
				What delicious meal are you craving today?
			</div>
			<div className="dashboard-light-text">Login to buy items!</div>

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
	);
}
