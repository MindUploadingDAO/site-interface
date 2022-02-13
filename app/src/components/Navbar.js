import styled from 'styled-components';
import Media from "./Media";
import React from "react";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 30px 0;
    font-size: 2em;
  }

  .logo .link {
    text-decoration: none;
    color:#000000;
  }
`;

const Navbar = () => {
    return (
      <Nav>
        <div className="logo"><a className="link" href="/">🗿 MindUploadingDAO</a></div>
        <Burger />
      </Nav>
    );
  };
  
  export default Navbar;