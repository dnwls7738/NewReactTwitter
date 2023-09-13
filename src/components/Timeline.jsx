import {
	collection,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

// export interface ITweet {
// 	id: string;
// 	photo: string;
// 	tweet: string;
// 	userId: string;
// 	username: string;
// 	createdAt: number;
// }

const Wrapper = styled.div``;

function Timeline() {
	const [tweets, setTweet] = useState([]);
	const fetchTweets = async () => {
		const tweetsQuery = query(
			collection(db, "tweets"),
			orderBy("createdAt", "desc")
		);
		const snapshot = await getDocs(tweetsQuery);
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
	};
	useEffect(() => {
		fetchTweets();
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
