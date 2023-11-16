import styled from "styled-components";
// Components
import PostTweetForm from "../components/PostTweetForm";
import Timeline from "../components/Timeline";
// CSS: Media query
import { customMedia } from "../styles/mediaQuery";

const Wrapper = styled.main`
  display: grid;
  gap: 30px;
  overflow-y: auto;
  ${customMedia.small} {
    grid-template-rows: none;
  }
  ${customMedia.large} {
    grid-template-rows: 1fr 5fr;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
