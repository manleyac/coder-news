const { UserDistinctFieldEnum } = require("@prisma/client");
const { getUserId } = require("../utils.js");

async function feed(parent, args, context, info) {
  const Authorization = context.request.get("Authorization");

  function getUserVotes() {
    const userId = getUserId(context);
    return {
      where: { userId: { equals: userId } },
      select: { id: true, value: true },
    };
  }

  function getDate(dateFilter) {
    const now = new Date();

    switch (dateFilter) {
      case "Today":
        const yesterday = new Date(new Date().setDate(now.getDate() - 1));
        return yesterday;
      case "This Week":
        const lastWeek = new Date(new Date().setDate(now.getDate() - 7));
        return lastWeek;
      case "This Month":
        const lastMonth = new Date(new Date().setDate(now.getDate() - 31));
        return lastMonth;
      case "This Year":
        const lastYear = new Date(new Date().setDate(now.getDate() - 365));
        return lastYear;
      case "All Time":
        return undefined;
    }
  }

  const where = args.filter
    ? {
        createdAt: {
          gte: getDate(args.filter),
        },
      }
    : {};

  const votes = Authorization ? getUserVotes() : false;

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
      select: { id: true, value: true },
    };
  }

  const votes = Authorization ? getUserVotes() : false;

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
