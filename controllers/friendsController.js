const {
  getFriendReqs,
  getSentreqs,
  getPendingReqs,
  getCurrentFriends,
  removeFriend,
  acceptFriend,
  requestFriend
} = require('../services/friendsService');

exports.getAllCurrentFriends = async (req, res) => {
  try {
    const user_b = req.user.id;
    const allCurrentFriends = await getCurrentFriends(user_b);
    const returnAllCurrentFriends = allCurrentFriends.map((friend) =>
      JSON.parse(friend.user_a)
    );

    res.status(200).json({ sucess: true, returnAllCurrentFriends });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get current friends' }]
    });
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
      errors: [{ msg: 'Server error: Could not get pending friends' }]
    });
  }
};

// next function will be the delete controller

exports.deleteFriend = async (req, res) => {
  const user_b = req.body.user_b;
  const user_a = req.body.user_a;
  removeFriend(user_b, user_a);

  res.status(200).end();
};

// next function will be the friend accept/patch

exports.acceptAFriend = async (req, res) => {
  try {
    const user_a = req.params.friendId;
    const user_b = req.user.id;
    const acceptSelectedFriend = await acceptFriend(user_b, user_a);

    res.status(200).json({ sucess: true, acceptSelectedFriend });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get added friend' }]
    });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const user = req.user.id;
    const newFriend = req.body.user_b;
    const message = req.body.message;

    console.log(user, newFriend, message);

    const currentRequest = await requestFriend(user, newFriend, message);

    res.status(200).json({ sucess: true, request: currentRequest });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not request friend' }]
    });
  }
};
