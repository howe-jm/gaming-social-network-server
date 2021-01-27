const db = require('../knex/knex');

exports.retrieveFavorites = async (user_id) => {
  try {
    const games = await db.from('fav_games').where({ user_id }).returning('*');
    return games;
  } catch (err) {
    throw new Error('Cannot retrieve favorite games');
  }
};

exports.retrieveFavoritesCount = async (game_id) => {
  let total = 0;
  try {
    const count = await db.from('fav_games').where({ game_id }).returning('*');
    if (!count) {
      return total;
    } else {
      total = count.length;
    }
    return total;
  } catch (err) {
    throw new Error('Cannot retrieve favorites count');
  }
};

exports.retrieveFavorite = async (user_id, game_id) => {
  try {
    const favorite = (await db.from('fav_games').where({ user_id, game_id }).returning('*'))[0];
    return favorite;
  } catch (err) {
    throw new Error('Cannot retrieve user favorites');
  }
};

exports.insertFavorite = async (user_id, game_id, newFavorite) => {
  try {
    const game = (await db('fav_games').insert({ user_id, game_id, game_json: newFavorite }).returning('*'))[0];
    return game;
  } catch (err) {
    throw new Error('Cannot insert new favorite');
  }
};

exports.removeFavorite = async (user_id, game_id) => {
  try {
    const deletedFavorite = await db('fav_games').where({ user_id, game_id }).delete();
    return deletedFavorite;
  } catch (err) {
    throw new Error('Cannot remove favorite');
  }
};
