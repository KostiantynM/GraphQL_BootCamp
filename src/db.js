const users = [
  {
    id: '1',
    name: 'Kostiantyn',
    email: 'kostiantyn.manko@gmail.com'
  },
  {
    id: '12',
    name: 'Kostiantyn',
    email: 'kostiantyn.manko@lasoft.org'
  },
  {
    id: '3',
    name: 'Hyperstan',
    email: 'hyperstan@ukr.net'
  }
];
const posts = [
  {
    id: '1',
    title: 'The very first post title',
    body: 'The very first post body',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'The second post title',
    body: 'The second post body',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'The third post title',
    body: 'The third post body',
    published: true,
    author: '3'
  }
];
const comments = [
  {
    id: '1',
    author: '1',
    post: '1',
    body: 'The very first comment'
  },
  {
    id: '2',
    author: '2',
    post: '2',
    body: 'The second comment'
  },
  {
    id: '3',
    author: '3',
    post: '3',
    body: 'The third comment'
  }
];
export default {
  users,
  posts,
  comments
};
