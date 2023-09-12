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
	Submit,
} from "../components/AuthComponent";
import GithubBtn from "../components/GithubBtn";

function CreatAccount() {
	const navigate = useNavigate();
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState("");
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const [value, setValue] = useState({
		name: "",
		email: "",
		password: "",
	});

	// input 변화를 알 수 있음
	const onChange = (e) => {
		// if (name === "name") {
		// 	setName(value);
		// } else if (name === "email") {
		// 	setEmail(value);
		// } else if (name === "password") {
		// 	setPassword(value);
		// }
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (
			isLoading ||
			value.name === "" ||
			value.email === "" ||
			value.password === ""
		)
			return;
		try {
			setisLoading(true);
			const credentials = await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			);
			// await sendEmailVerification(auth.currentUser);
			// alert("메일이 전송되었습니다");
			await updateProfile(credentials.user, { displayName: value.name });
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
					value={value.name}
					required
				/>
				<Input
					onChange={onChange}
					name="email"
					placeholder="Email"
					type="email"
					value={value.email}
					required
				/>
				<Input
					onChange={onChange}
					name="password"
					placeholder="Password"
					type="password"
					value={value.password}
					required
				/>
				<Submit
					type="submit"
					value={isLoading ? "Loading..." : "Create Account"}
				/>
			</Form>
			{error !== "" ? <Error>{error}</Error> : null}
			<Switcher>
				Already have an account?&nbsp;
				<Link to="/login">Log in &rarr;</Link>
			</Switcher>
			<GithubBtn />
		</Wrapper>
	);
}

export default CreatAccount;
