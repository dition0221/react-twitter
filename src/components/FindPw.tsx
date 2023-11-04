import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
// CSS
import { FindPwWrapper, Input, Overlay, PwForm } from "./auth-components";

export default function FindPw() {
  const [overlay, setOverlay] = useState(false);
  const overlayClick = () => setOverlay(false);

  const [isLoading, setIsLoading] = useState(false);
  const changePw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const emailForPw = e.currentTarget.emailForPw.value as string;
    if (emailForPw === "") return alert("Fail: Please input your E-mail.");
    try {
      await sendPasswordResetEmail(auth, emailForPw);
      alert(`Success: Send PW reset E-mail to ${emailForPw}`);
      setOverlay(false); // Close overlay
    } catch (error) {
      if (error instanceof FirebaseError) alert(`Fail: ${error.message}`);
      else alert("Fail: Bad Network or Bad E-mail.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FindPwWrapper>
      Did you forget your PW?&nbsp;
      <button onClick={() => setOverlay(true)}>Find PW &rarr;</button>
      {overlay ? (
        <>
          <Overlay onClick={overlayClick} />
          <PwForm onSubmit={changePw}>
            <span>Send e-mail for changing password</span>
            <Input
              name="emailForPw"
              type="email"
              placeholder="E-mail"
              required
            />
            <Input type="submit" value={isLoading ? "Loading.." : "Submit"} />
          </PwForm>
        </>
      ) : null}
    </FindPwWrapper>
  );
}
