import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, usernameVar } from "../apollo/cache";
import { navigate } from "@reach/router";
import { AUTH_TOKEN } from "../constants";

import {
  Box,
  Heading,
  Button,
  Form,
  FormField,
  TextInput,
  Text,
} from "grommet";
import MaxWidth from "../components/common/MaxWidth";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

//login and signup forms' state default values
const defaultValue = {
  username: "",
  password: "",
  password2: "",
  error: "",
};

//save JWT to local storage and set apollo state variables
const storeUserDataLogin = (data) => {
  localStorage.setItem(AUTH_TOKEN, data.login.token);
  isLoggedInVar(true);
  usernameVar(data.login.user.username);
};

const storeUserDataSignup = (data) => {
  localStorage.setItem(AUTH_TOKEN, data.signup.token);
  isLoggedInVar(true);
  usernameVar(data.signup.user.username);
};

//User login component
const LoginForm = () => {
  const [value, setValue] = useState(defaultValue);

  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
    onCompleted: (data) => {
      storeUserDataLogin(data);
      setValue(defaultValue);
      navigate("/");
    },
    onError: () => {
      setValue({ ...value, error: error.graphQLErrors[0].message });
      console.log(error);
    },
  });

  const loginSubmit = async (value) => {
    await loginUser({
      variables: { username: value.username, password: value.password },
    });
  };

  return (
    <Box
      margin="large"
      pad="medium"
      width="medium"
      alignSelf="center"
      background="accent-2"
      elevation="large"
      round="medium"
    >
      <Heading level={3} alignSelf="center" margin={{ top: "0" }}>
        Login
      </Heading>
      <Text alignSelf="center" weight="bold" color="status-critical">
        {value.error}
      </Text>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onValidate={() => {}}
        onSubmit={({ value }) => {
          loginSubmit(value);
        }}
      >
        <FormField
          name="username"
          htmlfor="text-input-id"
          label="Username"
          required
        >
          <TextInput id="text-input-id" name="username" />
        </FormField>
        <FormField
          name="password"
          htmlfor="text-input-id"
          label="Password"
          required
        >
          <TextInput id="text-input-id" name="password" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" color="accent-3" />
        </Box>
      </Form>
    </Box>
  );
};

//User signup component
const SignupForm = () => {
  const [value, setValue] = useState(defaultValue);

  const [signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    errorPolicy: "all",
    onCompleted: (data) => {
      storeUserDataSignup(data);
      setValue(defaultValue);
      navigate("/");
    },
    onError: () => {
      setValue({ ...value, error: error.graphQLErrors[0].message });
      console.log(error);
    },
  });

  const signupSubmit = async (value) => {
    if (value.password === value.password2) {
      await signupUser({
        variables: { username: value.username, password: value.password },
      });
    } else {
      setValue({ ...value, error: "Passwords do not match" });
    }
  };

  return (
    <Box
      margin="large"
      pad="medium"
      width="medium"
      alignSelf="center"
      background="accent-2"
      elevation="large"
      round="medium"
    >
      <Heading level={3} alignSelf="center" margin={{ top: "0" }}>
        Signup
      </Heading>
      <Text alignSelf="center" weight="bold" color="status-critical">
        {value.error}
      </Text>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onSubmit={({ value }) => {
          signupSubmit(value);
        }}
      >
        <FormField
          name="username"
          htmlfor="text-input-id"
          label="Username"
          required
          info="username must be alphanumeric"
          validate={[
            { regexp: /^\w+$/i },
            (username) => {
              if (username && username.length === 1)
                return "must be >1 character";
              return undefined;
            },
            (username) => {
              if (username && username.length > 13)
                return "must be < 13 characters";
              return undefined;
            },
          ]}
        >
          <TextInput id="text-input-id" name="username" />
        </FormField>
        <FormField
          name="password"
          htmlfor="text-input-id"
          label="Password"
          required
        >
          <TextInput id="text-input-id" name="password" />
        </FormField>
        <FormField
          name="password2"
          htmlfor="text-input-id"
          label="Confirm Password"
          required
        >
          <TextInput id="text-input-id" name="password2" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" color="accent-3" />
        </Box>
      </Form>
    </Box>
  );
};

//main page component handles login vs signup logic
const Login = () => {
  const [loginUser, setLogin] = useState(true);

  return (
    <Box background="accent-1" style={{ minHeight: "50vh" }}>
      <MaxWidth>
        {loginUser ? <LoginForm /> : <SignupForm />}

        <Box alignSelf="center">
          <Button
            primary
            color="accent-3"
            margin="medium"
            size="medium"
            label={loginUser ? "Create an account?" : "Need to login?"}
            onClick={() => setLogin(!loginUser)}
          />
        </Box>
      </MaxWidth>
    </Box>
  );
};

export default Login;
