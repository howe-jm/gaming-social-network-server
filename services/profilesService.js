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

exports.updateUserBanner = async (banner_url, user_id) => {
    const profile = (
        await db('profiles')
            .update('banner_url', banner_url)
            .where({ user_id: user_id })
            .returning('*')
    )[0];
    return profile;
};

exports.updateUserImage = async (profile_url, user_id) => {
    const profile = (
        await db('profiles')
            .update('profile_url', profile_url)
            .where({ user_id: user_id })
            .returning('*')
    )[0];
    return profile;
};

exports.getUserImages = async (user_id) => {
    const images = await db('user_images')
        .select('*')
        .where({ user_id: user_id })
        .returning('*');
    return images;
};

exports.postUserImage = async (user_id, imageURL) => {
    await db('user_images').insert({
        user_id,
        image_url: imageURL,
    });
    return this.getUserImages(user_id);
};
