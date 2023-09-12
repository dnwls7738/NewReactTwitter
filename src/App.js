import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";
import HOME from "./routes/Home";
import Profile from "./routes/Profile";
import CreateAccount from "./routes/CreateAccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./routes/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "",
				element: <HOME />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/create_account",
		element: <CreateAccount />,
	},
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
	box-sizing: border-box;	

}
body{
	background-color: black;
	color: white;	
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 
	'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 
	'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
`;
function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		await auth.authStateReady();
		setIsLoading(false);
	};
	useEffect(() => {
		init();
	}, []);
	return (
		<Wrapper>
			<GlobalStyles />
			{isLoading ? <Loading /> : <RouterProvider router={router} />}
		</Wrapper>
	);
}

export default App;
