const {
  retrieveFavorite,
  removeFavorite,
  retrieveFavorites,
  retrieveFavoritesCount,
  insertFavorite,
} = require('../services/favoritesService');

exports.getFavorites = async (req, res) => {
  try {
    const user_id = req.user.id;
    const favGames = await retrieveFavorites(user_id);

    const favoritedGames = await favGames.map((game) => JSON.parse(game.game_json));

    if (!favoritedGames) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not get favorite games' }],
      });
    }

    res.status(200).json({ success: true, favorites: favoritedGames });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get favorite games' }],
    });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const user_id = req.query.userId;
    const favGames = await retrieveFavorites(user_id);

    const favoritedGames = await favGames.map((game) => JSON.parse(game.game_json));

    if (!favoritedGames) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not get favorite games' }],
      });
    }

    res.status(200).json({ success: true, favorites: favoritedGames });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get favorite game' }],
    });
  }
};

exports.getFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const game_id = req.params.gameId;
    const favorite = await retrieveFavorite(user_id, game_id);

    if (!favorite) {
      return res.status(200).json({
        success: false,
      });
    }

    res.status(200).json({ success: true, favorite });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get favorite' }],
    });
  }
};

exports.getTotalFavs = async (req, res) => {
  // gameId = '1'
  // `http://localhost:3000/favorites/count?gameId=${gameId}`
  try {
    const { gameId, gameName } = req.query;
    const favoriteCount = await retrieveFavoritesCount(gameId);
    if (!favoriteCount) {
      res.status(204).json({
        success: false,
        errors: [{ msg: 'Game does not have any favorites.' }],
      });
      return favoriteCount;
    }

    res.status(200).json({ success: true, favoriteCount: favoriteCount });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: could not get favorites count.' }],
    });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const newFavorite = JSON.stringify(req.body.game);
    const game_id = req.body.game_id;
    const user_id = req.user.id;
    const insertedGame = await insertFavorite(user_id, game_id, newFavorite);

    if (!insertedGame) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not add favorite' }],
      });
    }

    insertedGame.game_json = JSON.parse(insertedGame.game_json);

    res.status(200).json({
      success: true,
      game_id: insertedGame.game_id,
      game: insertedGame,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not add game' }],
    });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const { gameId } = req.params;
    const user_id = req.user.id;

    const removedGame = await removeFavorite(user_id, gameId);
    console.log(removedGame);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
