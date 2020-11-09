import React, { useState } from "react";
import { navigate } from "@reach/router";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/cache";

import {
  Box,
  Heading,
  Button,
  Form,
  FormField,
  TextInput,
  TextArea,
  Text,
  Layer,
} from "grommet";
import { FormClose } from "grommet-icons";
import MaxWidth from "../components/common/MaxWidth";
import CustomMD from "../components/common/CustomMD";

const SUBMIT_POST = gql`
  mutation Post($title: String!, $content: String!) {
    post(title: $title, content: $content) {
      id
    }
  }
`;

const defaultValues = { title: "", content: "", error: "", open: false };

const Submit = () => {
  const [values, setValues] = useState(defaultValues);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [makePost] = useMutation(SUBMIT_POST, {
    onCompleted: (data) => navigate(`post/${data.post.id}`),
    onError: (error) => setValues({ ...values, error: error, open: true }),
  });

  const closeLayer = () => {
    setValues({ ...values, open: false, error: "" });
  };

  const postSubmit = () => {
    if (isLoggedIn) {
      makePost({ variables: { title: values.title, content: values.content } });
    } else {
      setValues({ ...values, error: "Login to submit post", open: true });
    }
  };

  return (
    <Box id="content" background="accent-5" style={{minHeight: "calc(100vh - 84px - 96px)",}}>
      <MaxWidth>
        {values.open && (
          <Layer
            animation="fadeIn"
            position="top"
            responsive={false}
            modal={false}
            style={{ marginTop: "6vh" }}
            onEsc={closeLayer}
            plain
          >
            <Box
              direction="row"
              background="status-error"
              pad="small"
              round="medium"
              elevation="medium"
            >
              <Text>{values.error}</Text>
              <Button icon={<FormClose />} onClick={closeLayer} plain />
            </Box>
          </Layer>
        )}
        <Box
          background="accent-2"
          margin="small"
          pad="small"
          round="small"
          elevation="medium"
        >
          <Heading level={3} alignSelf="center">
            Submit New Post
          </Heading>
          <Form
            value={values}
            onChange={(nextValue) => setValues(nextValue)}
            onSubmit={() => {
              postSubmit();
            }}
          >
            <FormField name="title" htmlfor="text-input-id" label="Post Title">
              <TextInput id="text-input-id" name="title" />
            </FormField>
            <FormField
              name="content"
              htmlfor="text-input-id"
              label="Post Content"
            >
              <TextArea
                id="text-input-id"
                name="content"
                fill={true}
                style={{ minHeight: "20vh" }}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" color="accent-3" primary label="Submit" />
            </Box>
          </Form>
        </Box>
        <Box
          background="accent-2"
          margin="small"
          pad="small"
          round="small"
          elevation="medium"
        >
          <Heading level={3} alignSelf="center">
            Post Preview
          </Heading>
          <Box border="all" pad="small" height={{ min: "medium" }}>
            <Heading level={1} alignSelf="center">
              {values.title}
            </Heading>
            <CustomMD >{values.content}</CustomMD>
          </Box>
        </Box>
      </MaxWidth>
    </Box>
  );
};

export default Submit;
