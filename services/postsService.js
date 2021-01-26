const db = require('../knex/knex');

exports.insertPost = async (post_text, user_id) => {
  try {
    const entity = (await db('entity').insert({}).returning('*'))[0];

    const post = (
      await db('entity_post')
        .insert({ entity_id: entity.id, user_id, post_text })
        .returning('*')
    )[0];

    const joinedPost = (
      await db('entity_post')
        .where({
          'entity_post.user_id': user_id,
          'entity_post.id': post.id
        })
        .join('users', {
          'users.id': 'entity_post.user_id'
        })
        .join('profiles', {
          'profiles.user_id': 'entity_post.user_id'
        })
        .returning('*')
    )[0];
    return joinedPost;
  } catch (err) {
    console.log(err);
  }
};

exports.getUserPosts = async (user_id) => {
  const posts = await db('entity_post')
    .where({ user_id })
    .join('users', {
      'users.id': 'entity_post.user_id'
    })
    .returning('*');
  return posts;
};

exports.getAllPosts = async (ids) => {
  const allPosts = await db('entity_post')
    .where((builder) => builder.whereIn('user_id', ids))
    .join('users', { 'users.id': 'entity_post.user_id' })
    .returning('*');
  return allPosts;
};
