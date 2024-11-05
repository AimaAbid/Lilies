import React from "react";
import "../styles/ItemCard.css";
// import ItemImage from "../assets/item-image.png";
import { useState } from "react";
import ItemPopup from "./ItemPopup";

export default function ItemCard({
	name,
	description,
	price,
	image,
	itemId,
	disabled,
}) {
	const [isPopupOpen, setisPopupOpen] = useState(false);
	const [id, setId] = useState(1);

	const closePopup = () => {
		setisPopupOpen(false);
	};

	return (
		<div className="item-card">
			{/* image start */}
			<div className="item-image">
				<div>
					<img src={`http://localhost:8000/assets/${image}`} alt={image} />
				</div>
			</div>
			{/* image end */}
			<div className="item-card-heading">{name}</div>
			<div className="item-card-text">{description}</div>
			{/* /////////// */}
			<div className="card-end-row">
				<div>
					{" "}
					<div className="item-price">Rs {price}</div>
				</div>
				<button
					className={disabled ? "disabled " : "add-to-cart-link"}
					disabled={disabled}
					onClick={() => handleClick(itemId)}
				>
					Add to cart
				</button>
			</div>
			{/* //////////// */}
			{/* Conditionally render the popup */}
			{isPopupOpen && <ItemPopup itemId={itemId} onClose={closePopup} />}
		</div>
	);

	function handleClick(itemId) {
		setisPopupOpen(true);
		// get id from the selected item
		setId(itemId);
	}
}
