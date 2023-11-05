import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export interface ITweet {
  createdAt: number;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    snapshot.docs.forEach((doc) => console.log(doc.data()));
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  return <Wrapper>{JSON.stringify(tweets)}</Wrapper>;
}
