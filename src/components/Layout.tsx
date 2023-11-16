import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
// CSS: Media query
import { customMedia } from "../styles/mediaQuery";

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  height: 100%;
  ${customMedia.small} {
    padding: 30px 0;
  }
  ${customMedia.large} {
    padding: 50px 0 30px;
    display: grid;
    grid-template-columns: 1fr 9fr;
    gap: 20px;
  }
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  ${customMedia.small} {
    margin-bottom: 20px;
    justify-content: center;
  }
  ${customMedia.large} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Logo = styled.svg`
  fill: white;
  ${customMedia.small} {
    width: 40px;
    height: 40px;
  }
  ${customMedia.large} {
    width: 50px;
    height: 50px;
  }
`;

const MenuItem = styled.div`
  ${customMedia.small} {
    width: 40px;
    height: 40px;
  }
  ${customMedia.large} {
    width: 50px;
    height: 50px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
  &:hover,
  &:active {
    background-color: #444;
    &:not(.log-out) {
      border-color: yellowgreen;
    }
  }
  transition: all 0.2s ease-in-out;
`;

export default function Layout() {
  const navigate = useNavigate();

  /* Log-out */
  const onLogOut = async () => {
    const ok = confirm("Are you sure want to log-out?");
    if (ok) {
      auth.signOut();
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <Menu>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </Logo>
        <MenuItem>
          <Link to="/">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              />
            </svg>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          </Link>
        </MenuItem>
        <MenuItem onClick={onLogOut} className="log-out">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            />
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
            />
          </svg>
        </MenuItem>
      </Menu>

      <Outlet />
    </Wrapper>
  );
}
