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
    throw new Error('Cannot insert post');
  }
};

exports.getUserPosts = async (user_id) => {
  try {
    const posts = await db('entity_post')
      .where({ user_id })
      .join('users', {
        'users.id': 'entity_post.user_id'
      })
      .returning('*');
    return posts;
  } catch (err) {
    throw new Error('Cannot get user posts');
  }
};

exports.getAllPosts = async (ids) => {
  try {
    const allPosts = await db('entity_post')
      .where((builder) => builder.whereIn('user_id', ids))
      .join('users', { 'users.id': 'entity_post.user_id' })
      .select([
        'users.id',
        'users.username',
        'entity_post.created_at',
        'entity_post.post_text',
        'entity_post.entity_id'
      ])
      .orderBy('entity_post.created_at', 'desc');
    return allPosts;
  } catch (err) {
    throw new Error('Cannot get all posts');
  }
};
