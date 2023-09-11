import React from "react";
import styled from "styled-components";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 420px;
	padding: 50px 0px;
`;
const Title = styled.h1`
	font-size: 42px;
`;
const Form = styled.form`
	margin-top: 50px;
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

function CreactAccount() {
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
		if (isLoading || name === "" || email === "" || password === "")
			return;
		try {
			const credentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(credentials);
			await updateProfile(credentials.user, { displayName: name });
			navigate("/");
		} catch (e) {
			// 에러 설정
		} finally {
			setisLoading(false);
		}
	};
	return (
		<Wrapper>
			<Title>New React Twitter</Title>
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
		</Wrapper>
	);
}

export default CreactAccount;
