const db = require('../knex/knex');

exports.insertComment = async (entity_id, user_id, comment_text) => {
  try {
    const comment = (
      await db('entity_comment')
        .insert({
          entity_id,
          user_id,
          comment_text
        })
        .returning('*')
    )[0];
    console.log(comment);
    return comment;
  } catch (err) {
    console.log(err);
  }
};
