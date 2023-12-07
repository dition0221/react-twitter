import { useState, useContext } from "react";
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
import { ReCaptchaContext } from "../App";

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

  // ! reCAPTCHA
  // TODO: null값에서 안 바뀜 -> 바뀌어야 함
  const ref = useContext(ReCaptchaContext);
  console.log("ref", ref);

  // Submit <form>
  const onSubmit = async ({ email, password }: IForm) => {
    // Handle exception
    if (isLoading) return alert("Fail: It's currently loading..");
    try {
      setIsLoading(true);
      // Check reCAPTCHA
      const token = await ref?.executeAsync();
      console.log("token", token);
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
      if (e instanceof FirebaseError)
        setError("firebase", { message: e.message });
    } finally {
      ref?.reset(); // Reset reCAPTCHA
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
