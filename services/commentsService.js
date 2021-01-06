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
                .select('*')
        )[0];
        return joinedComment;
    } catch (err) {
        console.log(err);
    }
};
