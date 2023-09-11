import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 420px;
	padding: 50px 0px;
`;
const Title = styled.h1`
	font-size: 28px;
`;
const Form = styled.form`
	margin-top: 50px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;
const Input = styled.input`
	padding: 10px 20px;
	border-radius: 50px;
	border: none;
	width: 100%;
	font-size: 16px;
	&[type="submit"] {
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
`;
const Error = styled.span`
	font-weight: 600;
	color: tomato;
`;

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
				<Input
					type="submit"
					value={isLoading ? "Loading..." : "Log in"}
				/>
			</Form>
			{error !== "" ? <Error>{error}</Error> : null}
		</Wrapper>
	);
}

export default Login;
