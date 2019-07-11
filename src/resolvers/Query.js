import {
  prepareUserData,
  preparePostData,
  prepareCommentData
} from '../utils/dataUtils';

import {
  signToken,
  verifyToken,
  comparePassword,
  authUser
} from '../utils/auth';

export default {
  async me(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    return prisma.query.user({ where: { id: userId }, info });
  },
  users(_, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      last: args.last,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query != null) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  post(_, args, { prisma }, info) {
    const opArgs = {};
    if (args.query != null && args.id) {
      opArgs.where = { id: args.id };
    }
    return prisma.query.post(opArgs, info);
  },
  async myPosts(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request, false);
    const opArgs = {
      first: args.first,
      last: args.last,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };

    if (args.query != null) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  async posts(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request, false);
    const opArgs = {
      first: args.first,
      last: args.last,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true
      }
    };

    if (args.query != null) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  comment(_, args, { prisma }, info) {
    const opArgs = {};
    if (args.query != null && args.query.id) {
      opArgs.where = { id: args.query.id };
    }
    return prisma.query.comment(opArgs, info);
  },
  comments(_, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      last: args.last,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query != null) {
      opArgs.where.OR = [
        {
          body_contains: args.query
        }
      ];
    }

    return prisma.query.comments(opArgs, info);
  }
};
