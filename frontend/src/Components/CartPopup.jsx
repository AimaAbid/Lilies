import React, { useState, useEffect } from "react";
import "../styles/CartPopup.css";
import axios from "axios";
import CheckoutForm from "../Components/CheckoutForm";

function CartPopup({ onClose }) {
	const [backenditems, setBackendItems] = useState({ cartItems: [] });
	const [backendCartItems, setBackendCartItems] = useState([
		{
			itemId: "",
			quantity: null,
			itemDetails: {
				name: "",
				price: "",
				image: "",
			},
			subtotal: null,
		},
	]);
	const [isCheckoutOpen, setCheckoutOpen] = useState(false);

	useEffect(() => {
		getCartItems();
	}, []);

	async function getCartItems() {
		try {
			const response = await axios.get(
				"http://localhost:8000/items/get-cart-items",
				{
					headers: { authorization: localStorage.getItem("token") },
				}
			);

			setBackendItems(response.data);
			setBackendCartItems(response.data.cartItems);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert("No items in cart");
				setBackendItems({ cartItems: [] });
				setBackendCartItems([]);
			} else {
				alert("Error fetching cart items: " + error.message);
			}
		}
	}

	async function handleRemove(itemId) {
		try {
			await axios.delete(
				`http://localhost:8000/items/delete-item-cart/${itemId}`,
				{
					headers: { authorization: localStorage.getItem("token") },
				}
			);
			alert("Item removed from cart");
			getCartItems();
		} catch (error) {
			console.log(error);
		}
	}

	function handleCheckout() {
		setCheckoutOpen(true);
	}

	function handleCheckoutClose() {
		setCheckoutOpen(false);
	}

	return (
		<div>
			{isCheckoutOpen ? (
				<CheckoutForm
					onCheckoutClose={handleCheckoutClose}
					backenditems={backenditems}
				/>
			) : (
				<div className="cart-popup">
					<div className="cart-popup-content">
						<button className="cart-close-button" onClick={onClose}>
							X
						</button>
						<header className="cart-header">
							<span>Your Cart</span>
						</header>

						<table className="cart-table">
							<thead>
								<tr>
									<th>Item</th>
									<th>Qty</th>
									<th>Unit Price</th>
									<th>Sub-total</th>
								</tr>
							</thead>
							<tbody>
								{backendCartItems.map((item) => (
									<tr key={item.itemId}>
										<td className="cart-item">
											<img
												src={`http://localhost:8000/assets/${item.itemDetails.image}`}
												alt={item.itemDetails.name}
											/>
											<div className="make-column">
												<span className="item-name">
													{item.itemDetails.name}
												</span>
												<span
													className="remove-item"
													onClick={() => handleRemove(item.itemId)}
												>
													Remove
												</span>
											</div>
										</td>
										<td className="table-data">{item.quantity}</td>
										<td className="table-data">N {item.itemDetails.price}</td>
										<td className="table-data">N {item.subtotal}</td>
									</tr>
								))}
							</tbody>
						</table>

						<footer className="cart-footer">
							<div className="cart-total">
								<div>Total:</div>
								<div className="total-amount">N {backenditems.totalAmount}</div>
							</div>
							<button className="cart-checkout-button" onClick={handleCheckout}>
								Checkout
							</button>
						</footer>
					</div>
				</div>
			)}
		</div>
	);
}

export default CartPopup;
