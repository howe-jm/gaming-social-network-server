const db = require('../knex/knex');

exports.insertPost = async (post_text, user_id) => {
  const entity = (await db('entity').insert({}).returning('*'))[0];
  const post = (
    await db('entity_post')
      .insert({ entity_id: entity.id, user_id, post_text })
      .returning('*')
  )[0];
  return post;
};

exports.getUserPosts = async (user_id) => {
  const posts = await db('entity_post')
    .where({ user_id })
    .join('users', {
      'users.id': 'entity_post.user_id'
    })
    .select(['entity_id', 'username', 'post_text', 'created', 'last_updated']);
  return posts;
};

exports.updateUserPost = async (content, user_id) => {};

exports.removeUserPost = async (content, user_id) => {};
