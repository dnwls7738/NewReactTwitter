import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
	Wrapper,
	Title,
	Form,
	Input,
	Error,
	Switcher,
	Submit,
} from "../components/AuthComponent";
import GithubBtn from "../components/GithubBtn";

function Login() {
	const navigate = useNavigate();
	const [isLoading, setisLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	// input 변화를 알 수 있음
	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (isLoading || email === "" || password === "") return;
		try {
			setisLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (e) {
			setError(e.message);
		} finally {
			setisLoading(false);
		}
	};
	return (
		<Wrapper>
			<Title>Login into New React Twitter</Title>
			<Form onSubmit={onSubmit}>
				<Input
					onChange={onChange}
					name="email"
					placeholder="Email"
					type="email"
					value={email}
					required
				/>
				<Input
					onChange={onChange}
					name="password"
					placeholder="Password"
					type="password"
					value={password}
					required
				/>
				<Submit
					type="submit"
					value={isLoading ? "Loading..." : "Log in"}
				/>
			</Form>
			{error !== "" ? <Error>{error}</Error> : null}
			<Switcher>
				Don't have an account? &nbsp;
				<Link to="/create_account">Create one &rarr;</Link>
			</Switcher>
			<GithubBtn />
		</Wrapper>
	);
}

export default Login;
