import styled from "styled-components";
// CSS: Media query
import { customMedia } from "./mediaQuery";

/* CSS: <CreateAccount>, <Login> */
export const Wrapper = styled.div`
  width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    color: white;
    background-color: #1d9bf0;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  text-align: center;
  font-weight: 600;
  color: tomato;
`;

export const ErrorFindPw = styled(Error)`
  width: fit-content;
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #222;
  text-decoration: underline;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: min(5vw, 16px);
  a {
    color: #1d9bf0;
  }
`;

/* CSS: <FindPw> */
export const FindPwWrapper = styled(Switcher)`
  button {
    font-size: 100%;
    background-color: transparent;
    color: #1d9bf0;
    border: none;
    padding: 0;
    margin-bottom: 40px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const PwForm = styled(Form)`
  width: 100%;
  max-width: 420px;
  padding: 0 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  height: fit-content;
  span {
    text-align: center;
  }
  ${customMedia.small} {
    font-size: min(5vw, 16px);
  }
  ${customMedia.large} {
    font-size: 22px;
  }
`;

/* CSS: Social login button */
export const SocialLoginBtn = styled.button`
  width: 100%;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  margin-top: 10px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  svg {
    height: 25px;
  }
`;
