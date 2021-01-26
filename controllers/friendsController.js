const {
  getPendingRequests,
  getCurrentFriends,
  removeFriend,
  acceptFriend,
  declineFriend,
  requestFriend,
  getSentRequests,
} = require('../services/friendsService');
const { getUserProfile } = require('../services/usersService');

exports.getAllCurrentFriends = async (req, res) => {
  try {
    const user_id = req.user.id;
    const allCurrentFriends = await getCurrentFriends(user_id);

    res.status(200).json({ success: true, allCurrentFriends });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get current friends' }],
    });
  }
};

// next function is to get all pending requests
exports.getAllPendingRequests = async (req, res) => {
  try {
    const user_id = req.user.id;
    const allPendingFriends = await getPendingRequests(user_id);

    res.status(200).json({ success: true, allPendingFriends });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get pending request' }],
    });
  }
};

exports.getAllSentRequests = async (req, res) => {
  try {
    const user_id = req.user.id;
    const allSentRequests = await getSentRequests(user_id);

    res.json({ success: true, allSentRequests });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get sent requests' }],
    });
  }
};

// next function will be the delete controller

exports.deleteFriend = (req, res) => {
  const { user_a, friend_id } = req.body;
  removeFriend(user_a, friend_id);
  res.status(200).json({ success: true, message: 'Friend has been deleted' });
};

// next function will be the friend accept/patch

exports.acceptAFriend = async (req, res) => {
  try {
    const { id, sender, user_id } = req.body;
    const acceptSelectedFriend = await acceptFriend(id, sender, user_id);

    res.status(200).json({ success: true, acceptSelectedFriend });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get added friend' }],
    });
  }
};

exports.declineAFriend = async (req, res) => {
  try {
    const { id } = req.body;
    const declinedFriend = await declineFriend(id);

    res.status(200).json({ success: true, declinedFriend });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not delete request' }],
    });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const user = req.user.id;
    const newFriend = req.body.user_b;

    const currentRequest = await requestFriend(user, newFriend);

    res.status(200).json({ success: true, request: currentRequest });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not request friend' }],
    });
  }
};
