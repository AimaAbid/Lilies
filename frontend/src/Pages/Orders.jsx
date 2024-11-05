import React from "react";
import "../styles/CartPopup.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
	const [backenditems, setBackendItems] = useState({ orderItems: [] });
	const [backendOrderItems, setBackendOrderItems] = useState([
		{
			itemId: "",
			quantity: null,
			date: "",
			time: "",
			itemDetails: {
				name: "",
				price: "",
				image: "",
			},
			subtotal: null,
		},
	]);

	useEffect(() => {
		getOrderItems();
	}, []);

	async function getOrderItems() {
		try {
			const response = await axios.get(
				"http://localhost:8000/items/get-order-items",
				{
					headers: { authorization: localStorage.getItem("token") },
				}
			);

			setBackendItems(response.data);
			setBackendOrderItems(response.data.orderItems);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert("No items in orders");
				setBackendItems({ orderItems: [] });
				setBackendOrderItems([]);
			} else {
				alert("Error fetching order items: " + error.message);
			}
		}
	}

	return (
		<div className="order-bg">
			<div className="order-container">
				<div className="order-heading">Your Orders</div>
				<p className="disperancy-text">
					If disperancy with orders please refresh. Refreshing might take a
					little time.
				</p>

				<table className="cart-table">
					<thead>
						<tr>
							<th>Item</th>
							<th>Qty</th>
							<th>Unit Price</th>
							<th>Sub-total</th>
							<th>Order Time</th>
						</tr>
					</thead>
					<tbody>
						{backendOrderItems.map((item) => (
							<tr key={item.itemId}>
								<td className="cart-item">
									<img
										src={`http://localhost:8000/assets/${item.itemDetails.image}`}
										alt={item.itemDetails.name}
									/>
									<div className="make-column">
										<span className="item-name">{item.itemDetails.name}</span>
									</div>
								</td>
								<td className="table-data">{item.quantity}</td>
								<td className="table-data">Rs {item.itemDetails.price}</td>
								<td className="table-data">Rs {item.subtotal}</td>
								<td className="table-data">
									{" "}
									{item.time}, {item.date}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="cart-footer"></div>
				<div className="cart-total">
					<div>Total:</div>
					<div className="total-amount">Rs {backenditems.totalAmount}</div>
				</div>
			</div>
		</div>
	);
}
