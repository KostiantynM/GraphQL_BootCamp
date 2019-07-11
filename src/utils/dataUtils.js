import { hashPassword } from './auth';

export const prepareUserData = (data) => {
  const errors = [];
  if (data.password.length < 8) errors.push('Password must be 8 characters or longer')
  if (data.password.length > 50) errors.push('Password must be less then 50 characters')


  if (errors.length > 0) throw new Error(errors)

  return hashPassword(data.password)
    .then(hashedPassword => {
      return {
        name: data.name,
        email: data.email,
        password: hashedPassword
      }
    })
}

export const preparePostData = (data) => {
  return {
    title: data.title,
    body: data.body,
    published: data.published,
    author: {
      connect: {
        id: data.author
      }
    }
  }
};
export const prepareCommentData = (data) => {
  return {
    body: data.body,
    post: {
      connect: {
        id: data.post
      }
    },
    author: {
      connect: {
        id: data.author
      }
    }
  }
}

export default {
  prepareUserData,
  preparePostData,
  prepareCommentData
}