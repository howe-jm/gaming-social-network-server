const db = require('../knex/knex');

exports.getUserProfile = async (id) => {
    const user = (await db('users').where({ username }).returning('*'))[0];
    const profile = (
        await db('profiles').where({ user_id: user.id }).returning('*')
    )[0];
    return profile;
};

exports.updateUserBio = async (bio, id) => {
    const profile = (
        await db('profiles')
            .update('user_bio', bio)
            .where({ user_id: id })
            .returning('*')
    )[0];
    return profile;
};
