const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils.js");

const APP_SECRET = process.env.APP_SECRET;

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  try {
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error("Username already taken");
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { username: args.username },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, args, context, info) {
  const userId = getUserId(context);

  const newPost = context.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      author: { connect: { id: userId } },
    },
  });
  return newPost;
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const checkVote = await context.prisma.vote.findOne({
    where: {
      postId_userId: {
        postId: parseInt(args.id),
        userId: userId,
      },
    },
  });

  if (!Boolean(checkVote)) {
    const updateTotal = await context.prisma.post.update({
      where: { id: parseInt(args.id) },
      data: { voteTotal: { increment: args.value } },
    });

    const newVote = await context.prisma.vote.create({
      data: {
        value: args.value,
        user: { connect: { id: userId } },
        post: { connect: { id: parseInt(args.id) } },
      },
      select: { id: true, value: true, post: true, user: true },
    });

    return newVote;
  } else {
    throw new Error("User Already Voted");
  }
}

async function comment(parent, args, context, info) {
  const userId = getUserId(context);
  const newComment = await context.prisma.comment.create({
    data: {
      content: args.content,
      author: { connect: { id: userId } },
      post: { connect: { id: parseInt(args.id) } },
    },
    select: {
      id: true,
      createdAt: true,
      author: { select: { username: true } },
      content: true,
    },
  });

  return newComment;
}

module.exports = {
  signup,
  login,
  post,
  vote,
  comment,
};
