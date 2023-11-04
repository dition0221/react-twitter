import styled from "styled-components";

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
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
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
  width: 420px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  padding: 20px;
  height: fit-content;
  span {
    text-align: center;
  }
`;
