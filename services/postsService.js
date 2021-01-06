const db = require('../knex/knex');

exports.insertPost = async (post_text, user_id) => {
    try {
        const entity = (await db('entity').insert({}).returning('*'))[0];

        const post = (
            await db('entity_post')
                .insert({ entity_id: entity.id, user_id, post_text })
                .returning('*')
        )[0];

<<<<<<< HEAD
        return post;
    } catch (err) {
        console.log(err);
    }
};

exports.getUserPosts = async (user_id) => {
    const posts = await db('entity_post')
        .where({ user_id })
        .join('users', {
            'users.id': 'entity_post.user_id',
        })
        .select('*');
    return posts;
=======
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
        .select([
          'entity_post.id',
          'entity_id',
          'profile_url',
          'entity_post.user_id',
          'post_text',
          'username',
          'created_at',
          'updated_at'
        ])
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
    .select([
      'entity_id',
      'username',
      'post_text',
      'created_at',
      'last_updated'
    ]);
  return posts;
>>>>>>> 9839bb28ba1749a2e78b040895d0f7e11b421652
};

exports.updateUserPost = async (content, user_id) => {};

exports.removeUserPost = async (content, user_id) => {};
