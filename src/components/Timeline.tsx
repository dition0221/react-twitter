import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { db } from "../firebase";
// Components
import Tweet from "./Tweet";
import AnchorBtn from "./AnchorBtn";

export interface ITweet {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  // overflow scroll
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari
  }
  scrollbar-width: none; // Firefox
`;

export default function Timeline() {
  // Get tweets
  const [tweets, setTweets] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      // Create query
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      /*
      // Get document from DB
      const snapshot = await getDocs(tweetsQuery);
      // Save data to state
      const tweetsArr = snapshot.docs.map((doc) => {
        const { createdAt, photo, tweet, userId, username } = doc.data();
        return { createdAt, photo, tweet, userId, username, id: doc.id };
      });
      */
      // Real-time connection
      unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
        const tweetsArr = snapshot.docs.map((doc) => {
          const { createdAt, photo, tweet, userId, username } = doc.data();
          return { createdAt, photo, tweet, userId, username, id: doc.id };
        });
        setTweets(tweetsArr);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  // Anchor button for scrolling to top
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Wrapper ref={timelineRef}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Wrapper>

      <AnchorBtn parent={timelineRef} />
      <AnchorBtn />
    </>
  );
}
