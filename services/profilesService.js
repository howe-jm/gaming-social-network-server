const db = require('../knex/knex');

exports.getUserProfile = async (id) => {
  try {
    const user = (await db('users').where({ username }).returning('*'))[0];
    const profile = (await db('profiles').where({ user_id: user.id }).returning('*'))[0];
    return profile;
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserBio = async (user_bio, user_id) => {
  try {
    const profile = (await db('profiles').update('user_bio', user_bio).where({ user_id: user_id }).returning('*'))[0];
    return profile;
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserBanner = async (banner_url, user_id) => {
  try {
    const profile = (
      await db('profiles').update('banner_url', banner_url).where({ user_id: user_id }).returning('*')
    )[0];
    return profile;
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserImage = async (profile_url, user_id) => {
  try {
    const profile = (
      await db('profiles').update('profile_url', profile_url).where({ user_id: user_id }).returning('*')
    )[0];
    return profile;
  } catch (err) {
    console.log(err);
  }
};

exports.getUserImages = async (user_id) => {
  try {
    const images = await db('user_images').select('*').where({ user_id: user_id }).returning('*');
    return images;
  } catch (err) {
    console.log(err);
  }
};

exports.postUserImage = async (user_id, imageURL) => {
  try {
    await db('user_images').insert({
      user_id,
      image_url: imageURL,
    });
    return this.getUserImages(user_id);
  } catch (err) {
    console.log(err);
  }
};

exports.updateHardware = async (user_id, hardware) => {
  try {
    const profile = (
      await db('profiles').update('preferred_hardware', hardware).where({ user_id: user_id }).returning('*')
    )[0];
    return profile;
  } catch (err) {
    console.error(err);
  }
};
