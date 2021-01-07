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
        // .select([
        //       'entity_comment.id',
        //       'entity_id',
        //       'profile_url',
        //       'entity_comment.user_id',
        //       'parent_comment_id',
        //       'comment_text',
        //       'username',
        //       'created_at',
        //       'updated_at'
        //     ])
        return joinedComment;
    } catch (err) {
        console.log(err);
    }
};

exports.retrievePostComments = async (entity_id) => {
    try {
        console.log(entity_id);
        const comments = await db('entity_comment')
            .where({ entity_id })
            .join('users', {
                'users.id': 'entity_comment.user_id',
            })
            .join('profiles', {
                'profiles.user_id': 'entity_comment.user_id',
            })
            .returning('*');
        return comments;
    } catch (err) {
        console.log(err);
    }
};
