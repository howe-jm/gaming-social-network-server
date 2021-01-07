const db = require('../knex/knex');

exports.getGames = async (user_id) => {
  const games = await db
    .from('fav_games')
    .where('user_id', user_id)
    .returning('*');
  return games;
};

exports.insertGame = async (user_id, newFavorite) => {
  try {
    console.log(user_id, newFavorite);
    const game = (
      await db('fav_games')
        .insert({ user_id, game_json: newFavorite })
        .returning('*')
    )[0];
    return game;
  } catch (err) {
    console.log(err);
  }
};

exports.removeGame = (user_id, toRemove) => {
  return db('fav_games')
    .where('user_id', user_id)
    .andWhere('game_json', toRemove)
    .delete();
};
