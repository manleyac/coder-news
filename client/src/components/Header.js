import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, usernameVar } from "../apollo/cache";

//constants
import { AUTH_TOKEN } from "../constants";

//components
import MaxWidth from "./common/MaxWidth";
import { Box, Heading, Layer, Button } from "grommet";
import { Menu, Close } from "grommet-icons";

const GET_USER = gql`
  query {
    checkToken
  }
`;

const Header = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  const user = useReactiveVar(isLoggedInVar);

  const [show, setShow] = useState(false);

  const [checkToken, { error }] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      isLoggedInVar(true);
      usernameVar(data.checkToken);
    },
    onError: () => console.log(error),
  });

  useEffect(() => {
    if (token && !isLoggedInVar()) {
      checkToken();
    }
  }, []);

  const NavLinkClick = () => {
    setShow(false);
  };
  const NavButton = () => {
    return (
      <>
        {show ? (
          <Button
            icon={<Close color="white" />}
            onClick={() => setShow(false)}
          />
        ) : (
          <Button icon={<Menu color="white" />} onClick={() => setShow(true)} />
        )}
      </>
    );
  };

  const UserLinks = () => {
    const username = useReactiveVar(usernameVar);
    const logoutUser = () => {
      isLoggedInVar(false);
      usernameVar("");
      localStorage.removeItem(AUTH_TOKEN);
    };

    return (
      <>
        <Heading
          textAlign="center"
          margin={{ top: "small", bottom: "medium" }}
          level={3}
        >{`Welcome, ${username}`}</Heading>

        <Link to="/" className="navLink">
          <Heading
            textAlign="center"
            margin="small"
            level={3}
            onClick={() => NavLinkClick()}
          >
            Feed
          </Heading>
        </Link>

        <Link to="submit" className="navLink">
          <Heading
            textAlign="center"
            margin="small"
            level={3}
            onClick={() => NavLinkClick()}
          >
            Submit
          </Heading>
        </Link>

        <Link to="login" className="navLink">
          <Heading
            textAlign="center"
            margin="small"
            level={3}
            onClick={() => {
              NavLinkClick();
              logoutUser();
            }}
          >
            Logout
          </Heading>
        </Link>
      </>
    );
  };

  const LoginLinks = () => (
    <>
      <Link to="/" className="navLink">
        <Heading
          textAlign="center"
          margin="small"
          level={3}
          onClick={() => NavLinkClick()}
        >
          Feed
        </Heading>
      </Link>

      <Link to="login" className="navLink">
        <Heading
          textAlign="center"
          margin="small"
          level={3}
          onClick={() => NavLinkClick()}
        >
          Login
        </Heading>
      </Link>
    </>
  );

  const Navbar = () => {
    const centerDivMaxWidth = 900;
    const contentHeight = document.getElementById("content").clientHeight;
    const headerHeight = document.getElementById("header").clientHeight;
    const navMargin = Math.max(
      window.innerWidth / 2 - centerDivMaxWidth / 2,
      0
    );

    return (
      <Layer
        modal={true}
        position="right"
        full="vertical"
        responsive={false}
        plain
        onClickOutside={() => {
          NavLinkClick();
        }}
        onEsc={() => {
          NavLinkClick();
        }}
        style={{
          marginTop: headerHeight,
          marginRight: navMargin,
          height: contentHeight,
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <Box
          background="accent-2"
          direction="column"
          alignContent="center"
          height="100%"
          style={{ width: "100%", maxWidth: "300px" }}
          elevation="large"
        >
          {user ? <UserLinks /> : <LoginLinks />}
        </Box>
      </Layer>
    );
  };

  return (
    <Box id="header" background="linear-gradient(60deg, #6c7b8a, #56616e)" elevation="large">
      <MaxWidth>
        <Box
          pad={{ left: "small", right: "small" }}
          direction="row"
          fill="horizontal"
          align="baseline"
          justify="between"
          alignContent="stretch"
          gap="small"
          style={{zIndex: 100}}
        >
          <Link to="/" className="navLink">
            <Heading level={3} responsive={false} color="accent-1">
              <strong>Coder News</strong>
            </Heading>
          </Link>
          <NavButton />
        </Box>
        {show && <Navbar />}
      </MaxWidth>
    </Box>
  );
};

export default Header;
