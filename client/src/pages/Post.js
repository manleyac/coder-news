import React, { useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/cache";

import {
  Box,
  Heading,
  Markdown,
  Button,
  Text,
  TextArea,
  Form,
  FormField,
  Layer,
} from "grommet";
import { FormClose, FormDown, FormUp } from "grommet-icons";
import MaxWidth from "../components/common/MaxWidth";
import CustomMD from "../components/common/CustomMD";

//Constants
import { UPVOTE, DOWNVOTE } from "../constants";

import { parseDate } from "../utils";

const GET_POST = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      title
      content
      createdAt
      voteTotal
      votes {
        value
      }
      author {
        username
      }
      comments {
        createdAt
        author {
          username
        }
        content
      }
    }
  }
`;

const VOTE_POST = gql`
  mutation Vote($id: ID!, $value: Int!) {
    vote(id: $id, value: $value) {
      post {
        voteTotal
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation Comment($id: ID!, $content: String!) {
    comment(id: $id, content: $content) {
      createdAt
      content
      author {
        username
      }
    }
  }
`;

//values used to initialize state
const defaultValues = {
  comment: "",
  open: false,
  error: "",
};

const Post = (props) => {
  const [values, setValues] = useState(defaultValues);
  const isLogggedIn = useReactiveVar(isLoggedInVar);

  const { data, loading, error, refetch } = useQuery(GET_POST, {
    variables: { id: props.postID },
  });

  const [votePost] = useMutation(VOTE_POST, {
    onCompleted: () => {
      refetch();
    },
    onError: () => {
      setValues({
        ...values,
        error: "Already voted for this post",
        open: true,
      });
    },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setValues({ ...values, comment: "" });
      refetch();
    },
    onError: (error) => setValues({ ...values, error: error, open: true }),
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>error {console.log(error)}</p>;
  if (!data) {
    return <p>Not found</p>;
  }

  const handleVote = (value, id) => {
    if (isLogggedIn) {
      votePost({ variables: { id: id, value: value } });
    } else {
      setValues({ ...values, error: "Please login to vote", open: true });
    }
  };

  const handleComment = () => {
    if (isLogggedIn) {
      addComment({
        variables: { id: props.postID, content: values.comment },
      });
    } else {
      setValues({ ...values, error: "Please login to comment", open: true });
    }
  };
  const closeLayer = () => {
    setValues({ ...values, open: false, error: "" });
  };

  //component to display voting buttons
  const VotePanel = (props) => {
    const { id, votes, voteTotal } = props;
    const iconColor = (voteDirection) => {
      if (votes && votes.length !== 0) {
        if (voteDirection === votes[0].value) {
          return "accent-3";
        } else {
          return "accent-1";
        }
      }
      return "accent-1";
    };
    return (
      <Box direction="row">
        <Button
          pad="none"
          alignSelf="center"
          icon={<FormUp size="30px" color={iconColor(UPVOTE)} />}
          onClick={() => handleVote(UPVOTE, id)}
        />
        <Text alignSelf="center">{voteTotal}</Text>
        <Button
          alignSelf="center"
          pad="none"
          icon={<FormDown size="30px" color={iconColor(DOWNVOTE)} />}
          onClick={() => handleVote(DOWNVOTE, id)}
        />
      </Box>
    );
  };

  return (
    <Box id="content" background="accent-5" pad={{bottom: "medium"}} style={{ height: "100%", minHeight: "calc(100vh - 84px - 96px)", }}>
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
          <Box background="brand" elevation="medium" round="small">
            <Heading level={1} alignSelf="center">
              {data.post.title}
            </Heading>
          </Box>

          <Box
            alignSelf="center"
            align="center"
            alignContent="center"
            direction="row"
          >
            <VotePanel
              id={props.postID}
              votes={data.post.votes}
              voteTotal={data.post.voteTotal}
            />
            <Text alignSelf="center">
              {`By ${data.post.author.username}
              | ${parseDate(data.post.createdAt)}`}
            </Text>
          </Box>
          <Box border="all" pad="small" round="small">
            <CustomMD>{data.post.content}</CustomMD>
          </Box>
        </Box>
        <Box
          background="accent-2"
          margin="small"
          pad="small"
          round="small"
          elevation="medium"
        >
          <Heading level={3} alignSelf="center">
            Comments
          </Heading>

          <Form
            value={values}
            onChange={({ comment }) =>
              setValues({ ...values, comment: comment })
            }
            onSubmit={() => handleComment()}
          >
            <FormField
              border={{ position: "inner", side: "all" }}
              name="comment"
              required
            >
              <TextArea
                name="comment"
                size="medium"
                placeholder="Add Comment:"
              />
            </FormField>
            <Button type="submit" label="submit" color="accent-3" primary />
          </Form>

          <Box>
            {data.post.comments.map((comment, index) => (
              <Box key={index} margin="small">
                <Box pad="xsmall" round="medium">
                  <Text size="small" border="all">{`By ${
                    comment.author.username
                  } | ${parseDate(comment.createdAt)}:`}</Text>
                </Box>
                <Box fill="horizontal" border="all" pad="small" round="small">
                  <Text size="large" >
                    {comment.content}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </MaxWidth>
    </Box>
  );
};

export default Post;
