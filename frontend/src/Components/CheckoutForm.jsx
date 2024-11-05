import React from "react";
// import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ onCheckoutClose, backenditems }) {
	const [order, setOrder] = useState({});

	var isPaymentSuccessfull = true;
	const navigate = useNavigate();
	// var navigate=useNavigate();

	async function placeOrder() {
		for (var i = 0; i < backenditems.cartItems.length; i++) {
			const currentOrder = {
				itemId: backenditems.cartItems[i].itemId,
				quantity: backenditems.cartItems[i].quantity,
			};

			try {
				const response = await axios.post(
					"http://localhost:8000/items/order/checkout",
					currentOrder,
					{
						headers: { authorization: localStorage.getItem("token") },
					}
				);
				console.log("response" + response.data.message);
				// alert(response.data.message);
				navigate("/orders");
			} catch (error) {
				console.error("Error placing order:", error);
				alert(error.message);
			}
		}
		alert("Order placed successfully");
	}

	function handlePayment() {
		if (isPaymentSuccessfull) {
			alert("Payment  successful");
			placeOrder();
		} else {
			alert("Payment not successful");
			alert("Try again later");
		}
	}
	return (
		<div className="checkout-popup">
			<div className="checkout-popup-content">
				<button className="checkout-close-button" onClick={onCheckoutClose}>
					X
				</button>
				<div>Checkout</div>
				<p className="info">You dont need to type in any details, just click on make payment button</p>
				<input type="text" placeholder="Card Number" />
				<input type="text" placeholder="Exp Date" />
				<input type="text" placeholder="CVV/CVV2" />
				<input type="text" placeholder="Card Pin" />
				<input type="text" placeholder="Make Payment" />
				<button className="payment-btn" onClick={handlePayment}>
					Make Payment
				</button>
			</div>
		</div>
	);
}
