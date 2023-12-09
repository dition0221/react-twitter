import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
// CSS
import {
  ErrorFindPw,
  FindPwWrapper,
  Input,
  Overlay,
  PwForm,
} from "../styles/auth-components";

interface IForm {
  email: string;
}

export default function FindPw() {
  // <Overlay>
  const [overlay, setOverlay] = useState(false);
  const overlayClick = () => setOverlay(false);

  // <PwForm>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  // Send e-mail to reset PW
  const [isLoading, setIsLoading] = useState(false);
  const onChangePw = async ({ email }: IForm) => {
    // Handle exception
    if (isLoading) return alert("Fail: Now loading..");
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert(`Success: Send PW reset E-mail to ${email}`);
      setOverlay(false); // Close overlay
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`Fail: ${error.message}`);
        setError(
          "email",
          { message: `Fail: ${error.message}` },
          { shouldFocus: true }
        );
      } else {
        alert("Fail: Bad Network or Bad E-mail.");
        setError(
          "email",
          { message: "Fail: Bad Network or Bad E-mail." },
          { shouldFocus: true }
        );
      }
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
          <PwForm onSubmit={handleSubmit(onChangePw)}>
            <span>Send e-mail for changing password</span>
            <Input
              {...register("email", {
                required: "Fail: Please input your E-mail.",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
                  message: "Fail: Only 'naver.com' emails allowed.",
                },
                validate: {
                  atSymbol: (v) => v.includes("@") || "Fail: It's not E-mail.",
                },
              })}
              type="email"
              placeholder="E-mail*"
              required
            />
            <Input type="submit" value={isLoading ? "Loading.." : "Submit"} />
            <ErrorFindPw>{errors.email?.message}</ErrorFindPw>
          </PwForm>
        </>
      ) : null}
    </FindPwWrapper>
  );
}
