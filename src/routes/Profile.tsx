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
import AnchorBtn from "./../components/AnchorBtn";
import { Error } from "../styles/auth-components";
// CSS: Media query
import { customMedia } from "../styles/mediaQuery";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.main`
  display: grid;
  gap: 50px;
  overflow-y: auto;
  ${customMedia.small} {
    grid-template-rows: none;
  }
  ${customMedia.large} {
    grid-template-rows: 1fr 5fr;
  }
`;

const ProfileSection = styled.section`
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
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
  font-size: min(7vw, 28px);
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  /* height: 63px; */
`;

const EditNameInput = styled.input`
  width: 200px;
  display: block;
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
  padding: 5px 10px;
  background-color: royalblue;
  color: white;
  font-weight: 600;
  border: 0;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const SubmitNameBtn = styled(EditNameBtn).attrs({
  as: "input",
  type: "submit",
})`
  background-color: greenyellow;
  color: black;
`;

const CancelNameBtn = styled(EditNameBtn)`
  background-color: lightgray;
  color: black;
  ${customMedia.small} {
    margin-left: 7px;
  }
  ${customMedia.large} {
    margin-left: 10px;
  }
`;

const Tweets = styled.section`
  width: 100%;
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

interface IEditNameForm {
  name: string;
}

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
  const [isEditName, setIsEditName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditNameForm>();
  const onEditName = async ({ name }: IEditNameForm) => {
    // Handle exception
    if (!user || isLoading) return;
    try {
      setIsLoading(true);
      await updateProfile(user, { displayName: name });
      setIsEditName(false);
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleEditName = () => setIsEditName((prev) => !prev);

  // Anchor button for scrolling to top
  const tweetsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Wrapper>
        <ProfileSection>
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
              <Form onSubmit={handleSubmit(onEditName)}>
                <EditNameInput
                  {...register("name", {
                    required: "Fail: Please write username.",
                    maxLength: {
                      value: 10,
                      message: "Fail: Please write no more than 10 characters.",
                    },
                  })}
                  defaultValue={user?.displayName ?? "Anonymous"}
                  maxLength={10}
                  type="text"
                  placeholder="Input username."
                  required
                />
                <SubmitNameBtn
                  value={isLoading ? "load..." : "submit"}
                  disabled={isLoading}
                />
                <CancelNameBtn onClick={toggleEditName}>Cancel</CancelNameBtn>
              </Form>
            ) : (
              user?.displayName ?? "Anonymous"
            )}
          </Name>
          {isEditName ? (
            <Error style={{ position: "absolute", top: "calc(100% + 5px)" }}>
              {errors.name?.message}
            </Error>
          ) : (
            <EditNameBtn onClick={toggleEditName}>Edit</EditNameBtn>
          )}
        </ProfileSection>

        <Tweets ref={tweetsRef}>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </Tweets>
      </Wrapper>

      <AnchorBtn parent={tweetsRef} />
      <AnchorBtn />
    </>
  );
}
