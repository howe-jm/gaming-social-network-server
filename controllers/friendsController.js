const {
  getFriendReqs,
  getSentreqs,
  getPendingReqs,
  getCurrentFriends,
  removeFriend,
  acceptFriend
} = require('../services/friendsService');

exports.getAllCurrentFriends = async (req, res) => {
    try {
        const user_b = req.user.id;
        const allCurrentFriends = await getCurrentFriends(user_b);
        const returnAllCurrentFriends = allCurrentFriends.map((friend) => JSON.parse(friend.user_a));

        res.status(200).json({sucess: true, returnAllCurrentFriends})
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get current friends'}]
        })
    }
};
// next function is to get all pending requests
exports.getAllPendingFriends = async (req, res) => {
  try {
    const user_b = req.user.id;
    const allPendingFriends = await getPendingReqs(user_b);
    const returnAllPendingFriends = allPendingFriends.map((friend) =>
      JSON.parse(friend.user_a)
    );

    res.status(200).json({ sucess: true, returnAllPendingFriends });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: "Server error: Could not get pending friends" }],
    });
  }
};

//next function is to delete a friend
exports.removeFriend