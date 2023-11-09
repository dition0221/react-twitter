import styled from "styled-components";
// Components
import PostTweetForm from "../components/PostTweetForm";
import Timeline from "../components/Timeline";

const Wrapper = styled.main`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 50px;
  overflow-y: auto;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
