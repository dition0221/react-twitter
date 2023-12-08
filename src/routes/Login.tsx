import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useForm } from "react-hook-form";
// CSS
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../styles/auth-components";
// Components
import GithubBtn from "../components/GithubBtn";
import FindPw from "../components/FindPw";
import GoogleBtn from "./../components/GoogleBtn";
import ReCAPTCHA from "react-google-recaptcha";

interface IForm {
  email: string;
  password: string;
  firebase?: string;
  reCaptcha?: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  // reCAPTCHA
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  // Submit <form>
  const onSubmit = async ({ email, password }: IForm) => {
    // Handle exception
    if (isLoading) return alert("Fail: It's currently loading..");
    try {
      setIsLoading(true);
      // Check reCAPTCHA
      const token = await reCaptchaRef.current?.executeAsync();
      if (!token)
        throw setError("reCaptcha", { message: "Fail: reCAPTCHA error." });
      // Log-In
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified)
        throw setError(
          "email",
          { message: "Fail: Not e-mail verified." },
          { shouldFocus: true }
        );
      // Redirect to the home page
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError)
        setError("firebase", { message: e.message });
    } finally {
      reCaptchaRef.current?.reset(); // Reset reCAPTCHA
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: "Fail: Input 'E-Mail*'.",
            minLength: {
              value: 11,
              message: "Fail: input 'E-Mail*' more than 11 characters.",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Fail: Only 'naver.com' emails allowed.",
            },
          })}
          placeholder="E-Mail*"
          type="email"
          autoComplete="username"
          required
        />
        <Input
          {...register("password", {
            required: "Fail: Input 'Password*'.",
            minLength: {
              value: 6,
              message: "Fail: input 'Password*' more than 6 characters.",
            },
          })}
          placeholder="Password*"
          type="password"
          autoComplete="current-password"
          required
        />
        <ReCAPTCHA
          // style={{ display: "none" }}
          ref={reCaptchaRef}
          size="invisible"
          sitekey={
            import.meta.env.DEV
              ? import.meta.env.VITE_FIREBASE_APPCHECK_DEV_PUBLIC_KEY
              : import.meta.env.VITE_FIREBASE_APPCHECK_PUBLIC_KEY
          }
        />
        <Input
          type="submit"
          value={isLoading ? "Loading.." : "Log In"}
          disabled={isLoading ? true : false}
        />
      </Form>
      <Error>{errors.email?.message}</Error>
      <Error>{errors.password?.message}</Error>
      <Error>{errors.firebase?.message}</Error>
      <Error>{errors.reCaptcha?.message}</Error>

      <Switcher>
        Don't have an account?&nbsp;
        <Link to="/create-account">Create One &rarr;</Link>
      </Switcher>
      <FindPw />
      <GithubBtn />
      <GoogleBtn />
    </Wrapper>
  );
}
