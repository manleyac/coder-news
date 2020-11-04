import React, { useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { Link } from "@reach/router";

import { isLoggedInVar } from "../apollo/cache";

//Constants
import { LINKS_PER_PAGE, UPVOTE, DOWNVOTE } from "../constants";

import { parseDate } from "../utils";

//Styled Components
import {
  Box,
  Heading,
  Button,
  Select,
  Text,
  FormField,
  Layer,
  ThemeContext,
} from "grommet";
import { FormClose, FormDown, FormUp } from "grommet-icons";
import MaxWidth from "../components/common/MaxWidth";

const GET_FEED = gql`
  query Feed(
    $skip: Int
    $take: Int
    $orderBy: LinkOrderByInput
    $filter: String
  ) {
    feed(skip: $skip, take: $take, orderBy: $orderBy, filter: $filter) {
      posts {
        title
        id
        author {
          username
        }
        createdAt
        voteTotal
        votes {
          value
        }
      }
      count
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

//values used to initialize state
const defaultValues = {
  pageNum: 0,
  sort: { createdAt: "desc" },
  sortBy: "Date",
  search: "",
  date: "This Year",
  open: false,
  error: "",
};

//obj relating sort options to argument passed to feed query
const sortObj = { Votes: { voteTotal: "desc" }, Date: { createdAt: "desc" } };

const Feed = () => {
  const [values, setValues] = useState(defaultValues);
  const isLogggedIn = useReactiveVar(isLoggedInVar);

  const { data, loading, error, refetch } = useQuery(GET_FEED, {
    variables: {
      skip: values.pageNum * LINKS_PER_PAGE,
      take: LINKS_PER_PAGE,
      orderBy: values.sort,
      filter: values.date,
    },
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

  if (loading) return null;
  if (error) return <p>error {console.log(error)}</p>;
  if (!loading && data.feed.posts === []) return <p>Not found</p>;

  const handleVote = (value, id) => {
    if (isLogggedIn) {
      votePost({ variables: { id: id, value: value } });
    } else {
      setValues({ ...values, error: "Please login to vote", open: true });
    }
  };

  const closeLayer = () => {
    setValues({ ...values, open: false, error: "" });
  };

  //next page button to increment pagination
  const NextButton = () => (
    <Button
      size="small"
      margin="small"
      alignSelf="end"
      label="Next"
      color="accent-3"
      onClick={() => {
        setValues({ ...values, pageNum: values.pageNum + 1 });
      }}
    />
  );

  //prev page button to decriment pagination
  const PrevButton = () => (
    <Button
      size="small"
      margin="small"
      alignSelf="start"
      label="Prev"
      color="accent-3"
      onClick={() => {
        setValues({ ...values, pageNum: values.pageNum - 1 });
      }}
    />
  );

  //component to display voting buttons
  const VotePanel = (props) => {
    const { id, voteTotal, votes } = props.post;
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
      <Box width="xxsmall">
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
    <Box
      background="accent-1"
      style={{ minHeight: "50vh", paddingBottom: "5vh" }}
    >
      <MaxWidth>
        {values.open && (
          <Layer
            animation="fadeIn"
            position="top"
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
        <Box pad="medium" direction="row" align="baseline" alignSelf="center">
          <Text size="medium" color="black" margin={{ right: "xsmall" }}>
            Sort By:
          </Text>
          <ThemeContext.Extend value={{ FormField: { border: "none" } }}>
            <FormField width="5em" margin={{ right: "large" }} pad={false}>
              <Select
                id="sort"
                name="sort"
                value={values.sortBy}
                placeholder="Sort by"
                options={["Date", "Votes"]}
                onChange={({ option }) => {
                  setValues({
                    ...values,
                    sortBy: option,
                    sort: sortObj[option],
                  });
                }}
              />
            </FormField>
          </ThemeContext.Extend>
          <Text color="black" margin={{ right: "xsmall" }}>
            Date Range:
          </Text>
          <FormField width="7em">
            <Select
              size="medium"
              id="date"
              name="date"
              value={values.date}
              options={[
                "Today",
                "This Week",
                "This Month",
                "This Year",
                "All Time",
              ]}
              onChange={({ option }) => {
                setValues({ ...values, date: option });
              }}
            />
          </FormField>
        </Box>
        <Box>
          {data.feed.posts.length < 1 ? (
            <Heading level={3} alignSelf="center">No Posts Found</Heading>
          ) : (
            data.feed.posts.map((post) => (
              <Box
                key={post.id}
                direction="row"
                margin="small"
                pad="small"
                round="small"
                background="accent-2"
                elevation="small"
              >
                <VotePanel post={post} />
                <Link to={`post/${post.id}`} className="feedLink">
                  <Box fill="horizontal">
                    <Heading level={3} margin="small" alignSelf="center">
                      {post.title}
                    </Heading>
                    <Text alignSelf="center">{` By ${
                      post.author.username
                    } | ${parseDate(post.createdAt)}`}</Text>
                  </Box>
                </Link>
              </Box>
            ))
          )}
        </Box>

        <Box direction="row" fill="horizontal">
          {values.pageNum > 0 && <PrevButton />}
          {values.pageNum < data.feed.count / LINKS_PER_PAGE - 1 && (
            <NextButton />
          )}
        </Box>
      </MaxWidth>
    </Box>
  );
};

export default Feed;
