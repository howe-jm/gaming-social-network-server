const {
    getFriendReqs, 
    getSentReqs, 
    getPendingReqs,
    getCurrentFriends, 
    removeFriend, 
    acceptFriend 
} = require('../services/friendsService');

exports.getAllCurrentFriends = async (req, res) => {
    try {
        const user_b = req.user.id;
        const allCurrentFriends = await getCurrentFriends(user_b);
        // may need to change to friend.user_a
        const returnAllCurrentFriends = allCurrentFriends.map((friend) => JSON.parse(friend))

        res.status(200).json({success: true, returnAllCurrentFriends});
    } catch (err) {
        res.status(500).json({
            success: false, 
            errors: [{msg: 'Server error: Could not get current friends'}]
        });
    }
};

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

exports.deleteFriend = async (req, res) => {
    const user_b = req.friend.user_b;
    const user_a = req.friend.user_a;
    removeFriend(user_b, user_a);

    res.status(200).end();
};