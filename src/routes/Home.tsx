import styled from "styled-components";
// Components
import PostTweetForm from "../components/PostTweetForm";

const Wrapper = styled.main``;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}
