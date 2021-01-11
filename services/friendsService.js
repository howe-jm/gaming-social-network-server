const db = require('../knex/knex');

<<<<<<< HEAD

// user_a is the sender, user_b is the receiver



// the below function returns all requests received by user_b
=======
//user_a is requesting, user_b is the receiving
//function returns all requests received 
>>>>>>> df44582f7ca6ad56a90395d96e76a3cdb4c8d26b
exports.getFriendReqs = async (user_b) => {
    const friends = await db
        .from('friends')
        .where('user_b', user_b)
        .returning('*');
    return friends;
};

<<<<<<< HEAD

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
=======
//function returns all outgoing friend requests
exports.getSentReqs = async (user_a) => {
    const friends = await db
      .from("friends")
      .where("user_a", user_a)
      .returning("*");
    return friends;
};

exports .getPendingReqs = async (user_b) => {
>>>>>>> df44582f7ca6ad56a90395d96e76a3cdb4c8d26b
    const pendingReqs = await db
        .from('friends')
        .where('user_b', user_b)
        .andWhere('pending', true)
        .returning('*');
    return pendingReqs;
};

<<<<<<< HEAD
exports.removeFriend = (user_b, user_a) => {
    return db('friends')
    .where('user_b', user_b)
    .andWhere('user_a', user_a)
    .delete();
};

exports.acceptFriend = async (user_b, user_a) => {
=======
exports.acceptFriend = async (user_b, user_a) => 
>>>>>>> df44582f7ca6ad56a90395d96e76a3cdb4c8d26b
    const accepted = false;
    const acceptedFriend = await db
        .from('friends')
        .where('user_b', user_b)
        .andWhere('user_a', user_a)
        .update({pending: accepted});
    return acceptedFriend;
<<<<<<< HEAD
};

exports.insertFriend = (user_id, username) => {};
=======
}

exports.removeFriend = (user_b, user_a) => {
    return db('friends')
    .where('user_b', user_b)
    .andWhere('user_a', user_a)
    .delete();
};
>>>>>>> df44582f7ca6ad56a90395d96e76a3cdb4c8d26b
