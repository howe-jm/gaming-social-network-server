const {
    getFriendReqs,
    getSentreqs,
    getPendingReqs,
    getCurrentFriends,
    removeFriend,
    acceptFriend,
    requestFriend,
} = require('../services/friendsService');
const { getUserProfile } = require('../services/usersService');

exports.getAllCurrentFriends = async (req, res) => {
    try {
        const user_b = req.user.id;
        const allCurrentFriends = await getCurrentFriends(user_b);
        console.log(allCurrentFriends);

        res.status(200).json({ success: true, allCurrentFriends });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get current friends' }],
        });
    }
};

// next function is to get all pending requests
exports.getAllPendingFriends = async (req, res) => {
    try {
        const user_b = req.user.id;
        const allPendingFriends = await getPendingReqs(user_b);

        res.status(200).json({ success: true, allPendingFriends });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get pending friends' }],
        });
    }
};

// next function will be the delete controller

exports.deleteFriend = (req, res) => {
    const { user_a, user_b } = req.body;
    removeFriend(user_b, user_a);
    res.status(200).end();
};

// next function will be the friend accept/patch

exports.acceptAFriend = async (req, res) => {
    try {
        const { user_b, user_a, friends_id } = req.body;
        const acceptSelectedFriend = await acceptFriend(
            user_b,
            user_a,
            friends_id
        );

        res.status(200).json({ success: true, acceptSelectedFriend });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get added friend' }],
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
