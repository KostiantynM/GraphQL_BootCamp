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
  async loginUser(_, args, { prisma }, info) {
    const {email, password} = args.data;
    const user = await prisma.query.user({where: {email}});
    
    if (user == null) {
      throw new Error('User does not exist!')
    }
    
    const verifed = await comparePassword(password, user.password);

    if (verifed !== true) {
      throw new Error('Access denied!')
    }

    const token = signToken({userId: user.id, isAdmin: user.isAdmin});

    return {
      token,
      user
    }
  },
  async createUser(_, args, { prisma }, info) {
    const data = await prepareUserData(args.data);
    const role = data.email === 'hyperstan@ukr.net' ? 'Admin': 'User';
    const user = await prisma.mutation.createUser({ data: {...data, role} });
    return {...user, role}
  },
  async updateUser(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    return prisma.mutation.updateUser({ data: args.data, where: { id: userId } }, info);
  },
  async deleteUser(_, { id }, { prisma, request }, info) {
    const { userId } = await authUser(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

  async createPost(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);

    const data = preparePostData({...args.data, author: userId});
    return prisma.mutation.createPost({ data }, info);
  },
  async updatePost(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    const { data } = args;
    const post = await prisma.query.posts({where: {
      AND: [
        {
          id: args.id
        },
        {
          author: {
            id: userId
          }
        }
      ]
    }});
    if (post.length !== 1) throw new Error('Forbidden!');

    if (post[0].published === true && data.published !== true) {
      await prisma.mutation.deleteManyComments({where: {post: {id: args.post}}});
    }
    return prisma.mutation.updatePost({ 
      data, 
      where: {
        id: args.id
      }
    }, info);
  },
  async deletePost(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    const post = await prisma.query.posts({
      where: {
        AND: [
          {
            author: {
              id: userId
            }
          },
          {
            id: args.id
          }
        ]
      }
    });
    if (post.length !== 1) throw new Error('Forbidden');
    
    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },
  async createComment(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    const data = prepareCommentData({...args.data, author: userId});
    const post = await prisma.query.post({where: {id: args.data.post}});

    if (userId == null || post == null || post.published !== true) throw new Error('Forbidden!');
    return prisma.mutation.createComment({ data }, info);
  },
  async updateComment(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    const comment = await prisma.query.comments({where: {
      AND: [
        {id: args.id},
        {
          author: {
            id: userId
          }
        }
      ]
    }});
    if (comment == null || userId == null) throw new Error('Forbidden!')
    const data = prepareCommentData({...args.data, author: userId});
    return prisma.mutation.updateComment(
      { data, where: { id: args.id } },
      info
    );
  },
  async deleteComment(_, args, { prisma, request }, info) {
    const { userId } = await authUser(request);
    const comment = await prisma.query.comments({where: {
      AND: [
        {id: args.id},
        {
          author: {
            id: userId
          }
        }
      ]
    }});
    if (comment == null || userId == null) throw new Error('Forbidden!')
    
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};
