import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
// ! import { FirebaseError } from "firebase/app";
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
import GoogleBtn from "../components/GoogleBtn";

export default function CreateAccount() {
  // Create account
  // TODO: 추후에 'React-Hook-Form' 패키지 사용하기
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    return alert("임시 폐쇄");
    // !
    e.preventDefault();
    setError("");
    // Handle exception
    if (isLoading || name === "" || email === "" || password === "") return;
    const regexp = /@naver\.com$/; // 네이버만 허용
    if (!regexp.test(email)) return;
    try {
      setIsLoading(true);
      // Create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(credentials.user);
      // Set the name of the user
      await updateProfile(credentials.user, { displayName: name });
      // Log out & Redirect to the home page
      auth.signOut();
      navigate("/");
    } catch (e) {
      // ! if (e instanceof FirebaseError) setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="E-Mail"
          type="email"
          autoComplete="username"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading.." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}

      <Switcher>
        Already have an account?&nbsp;
        <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <FindPw />
      <GithubBtn />
      <GoogleBtn />
    </Wrapper>
  );
}
