import React from "react";
import "../styles/ItemPopup.css";
// import ItemImage from "../assets/item-popup-img.png";
import { useState, useEffect } from "react";
import axios from "axios";
// import CartPopup from "../Components/CartPopup";

function ItemPopup({ itemId, onClose }) {
	const [itemCount, setItemCount] = useState(1);

	const [item, setItem] = useState({
		description: "",
		image: "",
		name: "",
		price: "",
		quantity: null,
	});

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		var response = await axios.get(
			`http://localhost:8000/items/get-item/${itemId}`,
			{
				headers: { authorization: localStorage.getItem("token") },
			}
		);

		response = response.data;
		setItem(response);
	}

	return (
		<div className="popup">
			<div className="popup-content">
				<button className="close-button" onClick={onClose}>
					X
				</button>
				<div className="popup-body">
					{/* {itemId}  this is content from the item we clicked upon*/}
					<div>
						<img
							src={`http://localhost:8000/assets/${item.image}`}
							alt="food-image"
						/>
					</div>
					<div className="popup-heading">{item.name}</div>
					<div className="popup-text">{item.description}</div>
					<div className="popup-items-row">
						<div className="popup-row-text">Rs {item.price}</div>
						<div className="popup-row-text">10-20 Mins</div>
						<div className="popup-row-text">{item.quantity} Pcs Avail</div>
					</div>
					<div className="popup-items-row">
						<div className="item-add-remover">
							<button
								className="add-remove-btn"
								onClick={() => handleItemChange(false)}
							>
								-
							</button>
							<div className="item-count">{itemCount}</div>
							<button
								className="add-remove-btn "
								onClick={() => handleItemChange(true)}
							>
								+
							</button>
						</div>
						<button className="add-to-cart-btn" onClick={handleAddCart}>
							Add to cart!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
	function handleItemChange(isTrue) {
		if (isTrue === true) {
			var temp = itemCount;
			setItemCount(temp + 1);
		} else if (itemCount !== 0 && isTrue === false) {
			temp = itemCount;
			setItemCount(temp - 1);
		}
	}

	async function handleAddCart() {
		try {
			var response = await axios.post(
				"http://localhost:8000/items/add-item-cart",
				{ itemId, quantity: itemCount },
				{
					headers: { authorization: localStorage.getItem("token") },
				}
			);

			response = response.data;
			alert(response.message + ": Please check out your Cart section");
			onClose();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				alert("Item out of stock");
			} else {
				alert("Error fetching order items: " + error.message);
				console.log(error.message);
			}
		}
	}
}

export default ItemPopup;
