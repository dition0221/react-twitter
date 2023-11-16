import styled from "styled-components";
// CSS: Media query
import { customMedia } from "../styles/mediaQuery";

const Btn = styled.button<{ $parent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #222;
  border: 2px solid whitesmoke;
  cursor: pointer;
  svg {
    fill: whitesmoke;
  }
  ${customMedia.small} {
    width: 40px;
    height: 40px;
    &:active {
      background-color: yellowgreen;
    }
    display: ${(props) => (props.$parent ? "none" : "flex")};
  }
  ${customMedia.large} {
    width: 50px;
    height: 50px;
    &:hover {
      background-color: yellowgreen;
    }
    display: ${(props) => (props.$parent ? "flex" : "none")};
  }
  transition: all 0.15s ease-in-out;
`;

interface IAnchorBtnProps {
  parent?: React.RefObject<HTMLDivElement>;
}

export default function AnchorBtn({ parent }: IAnchorBtnProps) {
  // Mobile: window's top / PC: parent container's top
  const onGoToTop = () =>
    (parent?.current || window).scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Btn onClick={onGoToTop} $parent={Boolean(parent)}>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
        />
      </svg>
    </Btn>
  );
}
