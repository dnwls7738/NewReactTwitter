import React from "react";
import PostTweetForm from "../components/PostTweetForm";
import styled from "styled-components";
import Timeline from "../components/Timeline";

const Wrapper = styled.div`
	display: grid;
	gap: 50px;
	overflow-y: scroll;
	grid-template-rows: 1fr 5fr;
	&::-webkit-scrollbar {
		display: none;
	}
`;

function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
			<Timeline />
		</Wrapper>
	);
}

export default Home;
