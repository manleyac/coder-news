const { UserDistinctFieldEnum } = require("@prisma/client");
const { getUserId } = require("../utils.js");

async function feed(parent, args, context, info) {
  const Authorization = context.request.get("Authorization");
  

  function getUserVotes() {
    const userId = getUserId(context);
    return {
      where: { userId: { equals: userId } },
      select: {id: true, value: true },
    }
  }

  const where = args.filter
    ? {
        OR: [
          { title: { contains: args.filter } },
          { author: { contains: args.filter } },
        ],
      }
    : {};

  const votes = (Authorization ? getUserVotes() : false);

  const posts = await context.prisma.post.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
    select: {
      title: true,
      id: true,
      createdAt: true,
      voteTotal: true,
      author: { select: { username: true } },
      votes: votes,
    },
  });

  const count = await context.prisma.post.count({ where });

  return {
    posts,
    count,
  };
}

async function post(parent, args, context, info) {
  const Authorization = context.request.get("Authorization");

  function getUserVotes() {
    const userId = getUserId(context);
    return {
      where: { userId: { equals: userId } },
      select: {id: true, value: true },
    }
  }

  const votes = (Authorization ? getUserVotes() : false);

  const post = await context.prisma.post.findOne({
    where: { id: parseInt(args.id) },
    select: {
      title: true,
      content: true,
      id: true,
      createdAt: true,
      voteTotal: true,
      votes: votes,
      author: { select: { username: true } },
      comments: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          author: { select: { username: true } },
        },
      },
    },
  });

  return post;
}

async function checkToken(parent, args, context, info) {
  const userId = getUserId(context);
  if (userId) {
    const usernameObj = await context.prisma.user.findOne({
      where: { id: userId },
      select: { username: true },
    });
    return usernameObj.username;
  }
  return "not valid";
}

module.exports = {
  feed,
  post,
  checkToken,
};
