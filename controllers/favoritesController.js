const {
  insertGame,
  getGames,
  removeGame
} = require('../services/favoritesService');

exports.getFavGames = async (req, res) => {
  try {
    const user_id = req.user.id;
    const favGames = await getGames(user_id);
    const returnAllGames = favGames.map((game) => JSON.parse(game.game_json));

    res.status(200).json({ success: true, returnAllGames });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get favorite games' }]
    });
  }
};

exports.addGame = async (req, res) => {
  try {
    const newFavorite = JSON.stringify(req.body.game);
    const user_id = req.user.id;
    const insertedGame = await insertGame(user_id, newFavorite);

    if (!insertedGame) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not add game' }]
      });
    }

    insertedGame.game_json = JSON.parse(insertedGame.game_json);

    res.status(200).json({
      success: true,
      game: insertedGame
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not add game' }]
    });
  }
};

exports.removeGame = (req, res) => {
  const toRemove = JSON.stringify(res.body.game_json);
  const user_id = req.user.id;
  removeGame(user_id, toRemove);

  res.status(200).end();
};
