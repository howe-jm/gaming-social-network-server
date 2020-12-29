const db = require('../knex/knex');

exports.insertPost = async (content, user_id) => {
  const post = (
    await db('posts').insert({ content, user_id }).returning('*')
  )[0];
  return post;
};

exports.getUserPosts = async (user_id) => {
  const posts = await db('posts').where({ user_id }).returning('*');
  return posts;
};

exports.updateUserPost = async (content, user_id) => {};

exports.removeUserPost = async (content, user_id) => {};
