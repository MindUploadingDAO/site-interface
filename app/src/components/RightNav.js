import React from "react";
import styled from "styled-components";
import Button from './Button'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #f5f5f5;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0s ease-in-out;
    margin-top:0;
    li {
      color: #fff;
    }
  }

  .link {
    font-size: 24px;
    margin: 10px;
    padding: 0.25em 1em;
    border-radius: 3px;
    background:#fff;
    color: #0c3fd9;
    text-decoration:none;
    border: 2px solid #0c3fd9;
    &:hover {
        border: 2px solid #000;
    }

    &:active {
        border: 2px solid #000;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li><a className="link" href="https://discord.gg/46G79Ag6gJ">Discord</a></li>
      <li><a className="link" href="https://snapshot.org/#/minduploading.eth">Snapshot</a></li>
      <li><a className="link" href="https://www.withtally.com/governance/eip155:1:0x7Bf0d70C0Cc3bde1e79EE7faBB59B61D7bf00480">Governance</a></li>
    </Ul>
  );
};

export default RightNav;
