import React from "react";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
	Wrapper,
	Title,
	Form,
	Input,
	Error,
	Switcher,
} from "../components/AuthComponent";

function CreatAccount() {
	const navigate = useNavigate();
	const [isLoading, setisLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	// input 변화를 알 수 있음
	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "name") {
			setName(value);
		} else if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (isLoading || name === "" || email === "" || password === "")
			return;
		try {
			setisLoading(true);
			const credentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(credentials.user, { displayName: name });
			navigate("/");
		} catch (e) {
			setError(e.message);
		} finally {
			setisLoading(false);
		}
	};
	return (
		<Wrapper>
			<Title>Join into New React Twitter</Title>
			<Form onSubmit={onSubmit}>
				<Input
					onChange={onChange}
					name="name"
					placeholder="Name"
					type="text"
					value={name}
					required
				/>
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
				<Input
					type="submit"
					value={isLoading ? "Loading..." : "Create Account"}
				/>
			</Form>
			{error !== "" ? <Error>{error}</Error> : null}
			<Switcher>
				Already have an account?
				<Link to="/login">Log in &rarr;</Link>
			</Switcher>
		</Wrapper>
	);
}

export default CreatAccount;
