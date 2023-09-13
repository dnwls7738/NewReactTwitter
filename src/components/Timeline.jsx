import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

const Wrapper = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

function Timeline() {
	const [tweets, setTweet] = useState([]);

	useEffect(() => {
		let unsubscribe = null;
		const fetchTweets = async () => {
			// 쿼리 생성
			const tweetsQuery = query(
				collection(db, "tweets"),
				orderBy("createdAt", "desc"),
				limit(25)
			);
			// 실시간 타임라인
			unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
				const tweets = snapshot.docs.map((doc) => {
					const { photo, tweet, userId, username, createdAt } = doc.data();
					return {
						photo,
						tweet,
						userId,
						username,
						createdAt,
						id: doc.id,
					};
				});
				setTweet(tweets);
			});
		};
		fetchTweets();
		return () => {
			unsubscribe && unsubscribe();
		};
	}, []);
	return (
		<Wrapper>
			{tweets.map((tweet) => (
				<Tweet key={tweet.id} {...tweet} />
			))}
		</Wrapper>
	);
}

export default Timeline;
