import React, { useState } from "react";
import { Box, Heading, Layer } from "grommet";
import { Link } from "@reach/router";
import { isLoggedInVar, usernameVar } from "../apollo/cache";
import { useReactiveVar } from "@apollo/client";

//constants
import { AUTH_TOKEN } from "../constants";



const Navbar = () => {
  return (
   <Layer position="right" plain>
       <Box
         background="brand"
         style={{ width: "100%", maxWidth: "300px"}}
       >
         <Box direction="column">{user ? <UserLinks /> : <LoginLinks />}</Box>
       </Box>
   </Layer>
  );
};
export default Navbar;
