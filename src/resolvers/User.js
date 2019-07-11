import { authUser } from '../utils/auth';

export default {
  email: {
    fragment: 'fragment UserId on User { id }',
    async resolve(_, args, { request }, info) {
      const { userId } = await authUser(request, false);
      console.log( userId, _)
      if (userId && userId === _.id) {
        return _.email;
      }

      return null;
    }
  },
  password: {
    fragment: 'fragment UserId on User { id }',
    async resolve(_, args, { request }, info) {
      const { userId } = await authUser(request, false);

      if (userId && userId === _.id) {
        return _.password;
      }

      return null;
    }
  },
  role: {
    fragment: 'fragment UserId on User { id }',
    async resolve(_, args, { request }, info) {
      const { userId } = await authUser(request, false);

    if (userId && userId === _.id) {
      return _.role;
    }

    return null;
    }
  },
  posts: {
    fragment: 'fragment UserId on User { id }',
    resolve(_, args, { prisma }, info) {
      return prisma.query.posts({where: {
        published: true,
        author: {
          id: _.id
        }
      }})
    }
  }
}
