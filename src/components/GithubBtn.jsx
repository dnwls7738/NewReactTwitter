import React from "react";
import styled from "styled-components";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
	background-color: white;
	margin-top: 50px;
	font-weight: 600;
	width: 100%;
	padding: 10px 20px;
	border-radius: 50px;
	border: 0;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	color: black;
	cursor: pointer;
`;
const Logo = styled.img`
	height: 25px;
`;

function GithubBtn() {
	const navigate = useNavigate();
	const onClick = async () => {
		try {
			const provider = new GithubAuthProvider();
			await signInWithPopup(auth, provider);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button onClick={onClick}>
			<Logo src={"/github-logo.svg"} />
			Countinue with Github
		</Button>
	);
}

export default GithubBtn;
