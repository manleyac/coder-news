import React, { useEffect } from "react";
import { Link } from "@reach/router";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, usernameVar } from "../apollo/cache";

//constants
import { AUTH_TOKEN } from "../constants";

//components
import MaxWidth from "./common/MaxWidth";
import { Box, Heading } from "grommet";

const GET_USER = gql`
  query {
    checkToken
  }
`;

const UserLinks = () => {
  const username = useReactiveVar(usernameVar);
  const logoutUser = () => {
    isLoggedInVar(false);
    usernameVar("");
    localStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <>
      <Heading level={3}>{`Welcome, ${username}`}</Heading>
      <Heading level={2} margin="xsmall">
        |
      </Heading>
      <Link to="/" className="navLink">
        <Heading level={3}>Feed</Heading>
      </Link>
      <Heading level={2} margin="xsmall">
        |
      </Heading>
      <Link to="submit" className="navLink">
        <Heading level={3}>Submit</Heading>
      </Link>
      <Heading level={2} margin="xsmall">
        |
      </Heading>
      <Link to="login" className="navLink">
        <Heading level={3} onClick={() => logoutUser()}>
          Logout
        </Heading>
      </Link>
    </>
  );
};

const LoginLinks = () => (
  <>
    <Link to="/" className="navLink">
      <Heading level={3}>Feed</Heading>
    </Link>
    <Heading level={2} margin="xsmall">
      |
    </Heading>
    <Link to="login" className="navLink">
      <Heading level={3}>Login</Heading>
    </Link>
  </>
);

const Header = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  const user = useReactiveVar(isLoggedInVar);

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

  return (
    <Box background="brand" elevation="large">
      <MaxWidth>
        <Box
          direction="row"
          fill="horizontal"
          align="baseline"
          justify="between"
          alignContent="stretch"
          gap="small"
        >
          <Link to="/" className="navLink">
            <Heading level={2}>Coder News</Heading>
          </Link>

          <Box direction="row" align="baseline">
            {user ? <UserLinks /> : <LoginLinks />}
          </Box>
        </Box>
      </MaxWidth>
    </Box>
  );
};

export default Header;
