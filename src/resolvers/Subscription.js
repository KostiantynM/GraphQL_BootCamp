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
} from '../utils/auth'

export default {
  post: {
    subscribe(_, args, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  },
  comment: {
    subscribe(_, { postId }, ctx, info) {
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info)
    }
  },
  myPost: {
    async subscribe(_, args, { prisma, request }, info) {
      const { userId } = await authUser(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)
    }
  }
}