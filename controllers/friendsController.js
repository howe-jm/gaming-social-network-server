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
<<<<<<< HEAD
        const returnAllCurrentFriends = allCurrentFriends.map((friend) => JSON.parse(friend.user_a));
=======
        // may need to change to friend.user_a
        const returnAllCurrentFriends = allCurrentFriends.map((friend) => JSON.parse(friend))
>>>>>>> 5b4f1e02888fdde087bcc363d3d25591879317a2

        res.status(200).json({sucess: true, returnAllCurrentFriends})
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get current friends'}]
        })
    }
};
<<<<<<< HEAD
// next function is to get all pending requests
=======

// next function is to get all pending requests

exports.getAllPendingFriends = async (req, res) => {
    try {
        const user_b = req.user.id;
        const allPendingFriends = await getPendingReqs(user_b);
        // may need to change to friend.user_a
        const returnAllPendingFriends = allPendingFriends.map((friend) => JSON.parse(friend))

        res.status(200).json({success: true, returnAllPendingFriends});
    } catch (err) {
        res.status(500).json({
            success: false, 
            errors: [{msg: 'Server error: Could not get pending friends'}]
        });
    }
};

// next function will be the delete controller

<<<<<<< HEAD
=======
exports.deleteFriend = async (req, res) => {
    const user_b = req.friend.user_b;
    const user_a = req.friend.user_a;
    removeFriend(user_b, user_a);

    res.status(200).end();
};
>>>>>>> 30857e61d376427f6b82e27b9d621a46adf06524
>>>>>>> 5b4f1e02888fdde087bcc363d3d25591879317a2
