import React from "react";
import PostTweetForm from "../components/PostTweetForm";
import styled from "styled-components";

const Wrapper = styled.div``;

function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
		</Wrapper>
	);
}

export default Home;
