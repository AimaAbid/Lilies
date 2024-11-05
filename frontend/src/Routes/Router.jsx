import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import PersonalDetails from "../Pages/PersonalDetails";
import Orders from "../Pages/Orders";
import UserList from "../Pages/UserList";
import MenuPage from "../Pages/MenuPage";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/personal-details",
		element: <PersonalDetails />,
	},
	{
		path: "/orders",
		element: <Orders />,
	},
	{
		path: "/user-list",
		element: <UserList />,
	},
	{
		path: "/menu",
		element: <MenuPage />,
	},
]);

export default Router;
