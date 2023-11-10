import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
// Interfaces
import { ITweet } from "../components/Timeline";
// Components
import Tweet from "../components/Tweet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* overflow-y: auto; */
`;

const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
  display: flex;
  align-items: center;
  position: relative;
`;

const EditNameInput = styled.input`
  width: 200px;
  padding: 5px 10px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
  &::placeholder {
    font-style: italic;
  }
`;

const EditNameBtn = styled.button`
  background-color: royalblue;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border: 0;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
  position: absolute;
  left: calc(100% + 10px);
  cursor: pointer;
`;

const Tweets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const user = auth.currentUser;

  /* Update avatar */
  const [avatar, setAvatar] = useState(user?.photoURL);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    // Update avatar image (file exist && file < 1MB)
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      if (file.size > 1048576)
        return alert("Fail: Please attach an image file of less then 1MB.");
      // Save avatar to storage
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      // Update profile
      setAvatar(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
    }
  };

  /* Get user's timeline */
  const [tweets, setTweets] = useState<ITweet[]>([]);
  useEffect(() => {
    const fetchTweets = async () => {
      // 1) Create query
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // 2) Get snapshot from DB
      const snapshot = await getDocs(tweetQuery);
      // 3) Save snapshot to stated
      const tweetsArr = snapshot.docs.map((doc) => {
        const { createdAt, photo, tweet, userId, username } = doc.data();
        return { createdAt, photo, tweet, userId, username, id: doc.id };
      });
      setTweets(tweetsArr);
    };
    fetchTweets();
  }, [user?.uid]);

  /* Edit username */
  const editRef = useRef<HTMLInputElement>(null);
  const [isEditName, setIsEditName] = useState(false);
  const toggleEditName = async () => {
    if (isEditName) {
      // Handle exception
      if (!user) return;
      if (!editRef.current?.value) return alert("Fail: Please write username.");
      if (editRef.current.value.length > 10)
        return alert("Fail: Please write no more than 10 characters.");
      // Update
      try {
        await updateProfile(user, { displayName: editRef.current.value });
      } catch (error) {
        console.log(error);
      }
    }
    // On/Off
    setIsEditName((prev) => !prev);
  };
  const onEditPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") toggleEditName();
  };

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />

      <Name>
        {isEditName ? (
          <EditNameInput
            ref={editRef}
            onKeyDown={onEditPressEnter}
            defaultValue={user?.displayName ?? "Anonymous"}
            maxLength={10}
            type="text"
            placeholder="Input username."
            required
          />
        ) : (
          user?.displayName ?? "Anonymous"
        )}
        <EditNameBtn onClick={toggleEditName}>Edit</EditNameBtn>
      </Name>

      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
