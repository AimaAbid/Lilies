import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PersonalDetails.css";
import Default from "../assets/defaultUser.webp";
import { useNavigate } from "react-router-dom";

export default function PersonalDetails() {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		image: "",
	});
	const [editing, setEditing] = useState(false);
	const [newImageFile, setNewImageFile] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserData();
	}, []);

	const fetchUserData = async () => {
		try {
			const response = await axios.get("http://localhost:8000/users/get-user", {
				headers: { authorization: localStorage.getItem("token") },
			});
			setUserData({
				username: response.data.username,
				email: response.data.email,
				password: "",
				image: response.data.image,
			});
		} catch (error) {
			console.error("Error fetching user data", error);
			setError("Error fetching user data");
		}
	};

	const handleEditToggle = () => {
		setEditing(!editing);
		setError("");
		setSuccess("");

		if (!editing) {
			setUserData((prevData) => ({ ...prevData, password: "" }));
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setNewImageFile(e.target.files[0]);
		}
	};

	const handleImageUpload = async () => {
		if (!newImageFile) return null;
		const formData = new FormData();
		formData.append("filename", newImageFile);
		try {
			const response = await axios.post(
				"http://localhost:8000/users/up",
				formData,
				{
					headers: {
						authorization: localStorage.getItem("token"),
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error uploading image:", error);
			setError("Error uploading image");
			return null;
		}
	};

	const handleSaveChanges = async () => {
		try {
			let updatedData = { ...userData };

			if (!updatedData.password) {
				delete updatedData.password;
			}

			if (newImageFile) {
				const uploadedImage = await handleImageUpload();
				if (uploadedImage) {
					updatedData.image = uploadedImage;
				} else {
					return;
				}
			}

			const response = await axios.put(
				"http://localhost:8000/users/edit",
				updatedData,
				{
					headers: { authorization: localStorage.getItem("token") },
				}
			);

			setEditing(false);
			fetchUserData();
			setSuccess("Profile updated successfully");
			setError("");
		} catch (error) {
			console.error("Error saving changes", error);
			setError("Error saving changes");
			setSuccess("");
		}
	};

	const handleDelete = async () => {
		if (
			window.confirm(
				"Are you sure you want to delete your account? This action cannot be undone."
			)
		) {
			try {
				await axios.delete("http://localhost:8000/users/delete-user", {
					headers: { authorization: localStorage.getItem("token") },
				});
				alert("User deleted successfully");
				navigate("/login");
			} catch (error) {
				console.error("Error deleting user", error);
				setError("Error deleting user");
			}
		}
	};

	return (
		<div className="personal-details-container">
			<div className="personal-details">
				<h2>Personal Details</h2>
				{error && <p className="error-message">{error}</p>}
				{success && <p className="success-message">{success}</p>}
				<div className="profile-picture">
					<img
						src={
							userData.image
								? `http://localhost:8000/assets/${userData.image}`
								: Default
						}
						alt="Profile"
					/>
					{editing && <input type="file" onChange={handleImageChange} />}
				</div>
				<div className="details">
					<label>Username:</label>
					<input
						type="text"
						name="username"
						value={userData.username}
						onChange={handleInputChange}
						disabled={!editing}
					/>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={userData.email}
						onChange={handleInputChange}
						disabled={!editing}
					/>
					{editing && (
						<>
							<label>New Password:</label>
							<input
								type="password"
								name="password"
								value={userData.password}
								onChange={handleInputChange}
								placeholder="Leave blank to keep current password"
							/>
						</>
					)}
				</div>
				<div className="buttons">
					{editing ? (
						<>
							<button onClick={handleSaveChanges}>Save</button>
							<button onClick={handleEditToggle}>Cancel</button>
						</>
					) : (
						<>
							<button onClick={handleEditToggle}>Edit</button>
							<button onClick={handleDelete}>Delete</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
