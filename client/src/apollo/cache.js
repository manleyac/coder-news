import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        username: {
          read() {
            return usernameVar();
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar(false);
export const usernameVar = makeVar("");
