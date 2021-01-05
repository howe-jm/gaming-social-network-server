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
  const posts = await db('entity_post').where({ user_id }).returning('*');
  return posts;
};

exports.updateUserPost = async (content, user_id) => {};

exports.removeUserPost = async (content, user_id) => {};
