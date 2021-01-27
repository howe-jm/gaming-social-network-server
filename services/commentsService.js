const db = require('../knex/knex');

exports.insertComment = async (entity_id, user_id, comment_text) => {
  try {
    const comment = (
      await db('entity_comment')
        .insert({
          entity_id,
          user_id,
          comment_text,
        })
        .returning('*')
    )[0];

    const joinedComment = (
      await db('entity_comment')
        .where({
          'entity_comment.user_id': user_id,
          'entity_comment.id': comment.id,
        })
        .join('users', {
          'users.id': 'entity_comment.user_id',
        })
        .join('profiles', {
          'profiles.user_id': 'entity_comment.user_id',
        })
        .returning('*')
    )[0];
    return joinedComment;
  } catch (err) {
    throw new Error('Cannot insert comment');
  }
};

exports.retrievePostComments = async (entity_id) => {
  try {
    const comments = await db('entity_comment')
      .where({ entity_id })
      .join('users', {
        'users.id': 'entity_comment.user_id',
      })
      .join('profiles', {
        'profiles.user_id': 'entity_comment.user_id',
      })
      .select([
        'entity_comment.created_at',
        'users.username',
        'profiles.profile_url',
        'entity_comment.comment_text'
      ]);
    console.log(comments);
    return comments;
  } catch (err) {
    throw new Error('Cannot retrieve post comments');
  }
};
