const db = require('../knex/knex');

//user_a is requesting, user_b is the receiving
//function returns all requests received
exports.getFriendReqs = async (user_b) => {
  const friends = await db
    .from('friends')
    .where('user_b', user_b)
    .returning('*');
  return friends;
};

//function returns all outgoing friend requests
exports.getSentReqs = async (user_a) => {
  const friends = await db
    .from('friends')
    .where('user_a', user_a)
    .returning('*');
  return friends;
};

exports.getCurrentFriends = async (user_b) => {
  const friends = await db
    .from('friends')
    .where('user_b', user_b)
    .andWhere('pending', false)
    .distinctOn('user_a')
    .join('users', { 'users.id': 'friends.user_a' })
    .select('username', 'friends_id')
    .returning('*');
  return friends;
};

exports.getPendingReqs = async (user_b) => {
  const pendingReqs = await db
    .from('friends')
    .where('user_b', user_b)
    .andWhere('pending', true)
    .distinctOn('user_a')
    .join('users', { 'users.id': 'friends.user_a' })
    .select('username', 'friends_id')
    .returning('*');

  return pendingReqs;
};

exports.acceptFriend = async (user_b, user_a) => {
  const accepted = false;
  const acceptedFriend = await db
    .from('friends')
    .where('user_b', user_b)
    .andWhere('user_a', user_a)
    .update({ pending: accepted });
  return acceptedFriend;
};

exports.removeFriend = (user_b, user_a) => {
  return db('friends')
    .where('user_b', user_b)
    .andWhere('user_a', user_a)
    .delete();
};

exports.requestFriend = async (user, newFriend) => {
  try {
    const request = (
      await db('friends')
        .insert({ user_a: user, user_b: newFriend })
        .returning('*')
    )[0];
    return request;
  } catch (err) {
    console.log(err);
  }
};
