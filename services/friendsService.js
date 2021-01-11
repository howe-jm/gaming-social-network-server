const db = require('../knex/knex');


// user_a is the sender, user_b is the receiver



// the below function returns all requests received by user_b
exports.getFriendReqs = async (user_b) => {
    const friends = await db
        .from('friends')
        .where('user_b', user_b)
        .returning('*');
    return friends;
};


// the below function returns all outgoing friend requests for user_a
exports.getSentReqs = async (user_a) => {
    const friends = await db
        .from('friends')
        .where('user_a', user_a)
        .returning('*');
    return friends;
}; 

// the below function returns all pending friend requests for user_b
exports.getPendingReqs = async (user_b) => {
    const pendingReqs = await db
        .from('friends')
        .where('user_b', user_b)
        .andWhere('pending', true)
        .returning('*');
    return pendingReqs;
};

exports.removeFriend = (user_b, user_a) => {
    return db('friends')
    .where('user_b', user_b)
    .andWhere('user_a', user_a)
    .delete();
};

exports.acceptFriend = async (user_b, user_a) => {
    const accepted = false;
    const acceptedFriend = await db
        .from('friends')
        .where('user_b', user_b)
        .andWhere('user_a', user_a)
        .update({pending: accepted});
    return acceptedFriend;
};

exports.insertFriend = (user_id, username) => {};
