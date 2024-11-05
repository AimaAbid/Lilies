import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

export default function UserList() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState("");
	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			const response = await axios.get("http://localhost:8000/admin/users", {
				headers: { authorization: localStorage.getItem("token") },
			});
			setUsers(response.data);
		} catch (error) {
			setError("Error fetching users");
		}
	}
	//userid of user whose role admin is wanting to change
	async function handleRoleChange(userId, newRole) {
		try {
			await axios.patch(
				`http://localhost:8000/admin/assign-role/${userId}`,
				{ role: newRole },
				{ headers: { authorization: localStorage.getItem("token") } }
			);
			fetchUsers();
		} catch (error) {
			setError("Error updating user role");
		}
	}

	return (
		<div className="admin-user-list-container">
			<div className="admin-user-list">
				<h2>User Management</h2>
				{error && <p className="error-message">{error}</p>}
				<table className="user-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									{user.role === "User" ? (
										<button
											className="make-admin-btn"
											onClick={() => handleRoleChange(user._id, "Admin")}
										>
											Make Admin
										</button>
									) : (
										<button
											className="remove-admin-btn"
											onClick={() => handleRoleChange(user._id, "User")}
										>
											Remove Admin
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
