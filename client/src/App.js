import React from "react";
import { ApolloProvider, ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./apollo/cache";
import { Router } from "@reach/router";
import { Grommet } from "grommet";

//constants
import { AUTH_TOKEN } from "./constants";
import { SERVER_URL } from "./constants";

//pages
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Submit from "./pages/Submit";
import NotFound from "./pages/NotFound";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//grommet theme
import myTheme from "./theme.js";

const httpLink = createHttpLink({
  uri: SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  headers: {
    authorization: localStorage.getItem(AUTH_TOKEN) || "",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={myTheme}>
        <Header />
        <Router>
          <Feed path="/" />
          <Login path="login" />
          <Post path="post/:postID" />
          <Submit path="submit" />
          <NotFound default path="notfound"/>
        </Router>
        <Footer />
      </Grommet>
    </ApolloProvider>
  );
}

export default App;
