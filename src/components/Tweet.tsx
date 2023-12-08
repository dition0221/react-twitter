import { auth, db, storage } from "../firebase";
import styled from "styled-components";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { format, register as timeagoRegister } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { useForm } from "react-hook-form";
// Interfaces
import { ITweet } from "./Timeline";
// CSS: Media query
import { customMedia } from "../styles/mediaQuery";
// Components
import { Error } from "../styles/auth-components";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.article`
  background-color: black;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  ${customMedia.small} {
    padding: 10px;
    gap: 10px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
  ${customMedia.large} {
    padding: 20px;
    gap: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Column = styled.div`
  &:first-child {
    width: 100%;
  }
  &:last-child {
    position: relative;
    &:hover {
      // If hover, Show edit/delete button
      button,
      label {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const Username = styled.span`
  font-weight: 600;
  font-size: min(4vw, 15px);
`;

const TweetContent = styled.p`
  margin: 10px 0;
  font-size: min(5vw, 18px);
`;

const EditTweetContent = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const Photo = styled.img`
  border-radius: 15px;
  ${customMedia.small} {
    width: 75px;
    height: 75px;
  }
  ${customMedia.large} {
    width: 100px;
    height: 100px;
  }
`;

const DeleteBtn = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${customMedia.small} {
    font-size: min(3.5vw, 12px);
    padding: 4px 6px;
  }
  ${customMedia.large} {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

const SubmitBtn = styled(DeleteBtn).attrs({
  as: "input",
  type: "submit",
  value: "submit",
})`
  background-color: greenyellow;
  color: black;
`;

const EditBtn = styled(DeleteBtn)`
  background-color: royalblue;
  ${customMedia.small} {
    margin-left: 7px;
  }
  ${customMedia.large} {
    margin-left: 10px;
  }
`;

const CancelBtn = styled(EditBtn)`
  background-color: lightgray;
  color: black;
  ${customMedia.small} {
    margin-right: 7px;
  }
  ${customMedia.large} {
    margin-right: 10px;
  }
`;

const EditPhotoInput = styled.input`
  display: none;
`;

const EditPhoto = styled.label`
  width: 25px;
  height: 25px;
  padding: 3px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: royalblue;
  display: none;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 5px;
  &:hover {
    background-color: blue;
  }
  svg {
    fill: white;
  }
`;

const DeletePhoto = styled(EditPhoto).attrs({ as: "button" })`
  background-color: tomato;
  left: inherit;
  right: 5px;
  &:hover {
    background-color: red;
  }
`;

interface IEditTweetForm {
  editTweet: string;
  firebase?: string;
}

export default function Tweet({
  createdAt,
  username,
  photo,
  tweet,
  userId,
  id,
}: ITweet) {
  const user = auth.currentUser;
  const deletePhotoStorage = async () => {
    if (user) {
      const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
      await deleteObject(photoRef);
    }
  };

  /* relative time */
  timeagoRegister("ko", koLocale);
  const relativeTime = format(createdAt, "ko");

  /* Edit tweet */
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditTweetForm>();
  const onEdit = async ({ editTweet }: IEditTweetForm) => {
    try {
      const tweetToUpdate = { tweet: editTweet };
      await updateDoc(doc(db, "tweets", id), tweetToUpdate);
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError)
        setError("firebase", { message: error.message });
      else setError("firebase", { message: "Error: Firebase." });
    } finally {
      setIsEdit(false);
    }
  };
  const toggleEdit = () => {
    // Handle exception
    if (user?.uid !== userId) return alert("Error: Different ID.");
    // Operate fn.
    setIsEdit((prev) => !prev);
  };

  /* Delete tweet */
  const onDelete = async () => {
    // Handle exception
    const ok = confirm("Are you sure delete this Tweet?");
    if (!ok || user?.uid !== userId) return;
    // Delete
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) deletePhotoStorage();
    } catch (error) {
      console.log(error);
    }
  };

  /* Edit photo */
  const onEditPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle exception
    if (!user || user.uid !== userId) return alert("Error: Different ID.");
    const { files } = e.target;
    if (!files || files.length !== 1)
      return alert("Fail: Select one image file.");
    if (files[0].size > 1048576)
      return alert("Fail: Please attach an image file of less then 1MB.");
    // Update photo file
    if (files && files.length === 1) {
      const file = files[0];
      try {
        // Update to storage
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(photoRef, file);
        const photoUrl = await getDownloadURL(result.ref);
        // Update to DB
        const photoToUpdate = { photo: photoUrl };
        await updateDoc(doc(db, "tweets", id), photoToUpdate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* Delete photo */
  const onDeletePhoto = async () => {
    // Handle exception
    if (!photo || user?.uid !== userId) return;
    const ok = confirm("Are you sure delete photo?");
    if (!ok) return;
    // Delete
    try {
      deletePhotoStorage(); // storage
      await updateDoc(doc(db, "tweets", id), { photo: null }); // DB
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{`${username} (${relativeTime})`}</Username>
        {isEdit ? (
          <form onSubmit={handleSubmit(onEdit)}>
            <EditTweetContent
              {...register("editTweet", {
                required: "Fail: Please write tweet.",
                maxLength: {
                  value: 180,
                  message: "Fail: Please write no more than 180 characters.",
                },
              })}
              rows={5}
              maxLength={180}
              defaultValue={tweet}
              placeholder="Edit tweet."
              required
            />
            <SubmitBtn />
            <CancelBtn onClick={toggleEdit}>Cancel</CancelBtn>
            <Error>{errors.editTweet?.message}</Error>
          </form>
        ) : (
          <>
            <TweetContent>{tweet}</TweetContent>
            {user?.uid === userId ? (
              <>
                <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
                <EditBtn onClick={toggleEdit}>Edit</EditBtn>
              </>
            ) : null}
          </>
        )}
      </Column>

      <Column>
        {photo ? (
          <>
            <Photo src={photo} />
            {user?.uid === userId ? (
              <>
                <EditPhotoInput
                  onChange={onEditPhoto}
                  type="file"
                  accept="image/*"
                  id="edit-photo"
                />
                <EditPhoto htmlFor="edit-photo">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </EditPhoto>
                <DeletePhoto onClick={onDeletePhoto}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    />
                  </svg>
                </DeletePhoto>
              </>
            ) : null}
          </>
        ) : null}
      </Column>
    </Wrapper>
  );
}
