const db = require('../knex/knex');

exports.getUserProfile = async (id) => {
    const user = (await db('users').where({ username }).returning('*'))[0];
    const profile = (
        await db('profiles').where({ user_id: user.id }).returning('*')
    )[0];
    return profile;
};

exports.updateUserBio = async (user_bio, user_id) => {
    const profile = (
        await db('profiles')
            .update('user_bio', user_bio)
            .where({ user_id: user_id })
            .returning('*')
    )[0];
    return profile;
};
