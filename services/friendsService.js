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

exports.getCurrentFriends = async (user_id) => {
  const friends = await db
    .from('friends')
    .where('user_a', user_id)
    .distinctOn('friend_id')
    .join('users', { 'users.id': 'friends.friend_id' })
    .select('username', 'friend_id', 'user_a')
    .returning('*');
  return friends;
};

exports.getPendingRequests = async (user_id) => {
  try {
    const pendingReqs = await db
      .from('requests')
      .where('reciever', user_id)
      .join('users', { 'users.id': 'requests.sender' })
      .select('username', 'sender', 'requests.id')
      .returning('*');
    return pendingReqs;
  } catch (err) {
    console.log(err);
  }
};

exports.getSentRequests = async (user_id) => {
  const sentReqs = await db
    .from('requests')
    .where('sender', user_id)
    .join('users', { 'users.id': 'requests.reciever' })
    .select('username', 'reciever', 'requests.id')
    .returning('*');
  console.log(sentReqs);
  return sentReqs;
};

exports.acceptFriend = async (id, sender, user_id) => {
  const acceptedFriend = await db.from('requests').where('id', id).delete();
  const insertIntoFriends = await db('friends').insert({
    user_a: sender,
    friend_id: user_id
  });
  const insertUserIntoFriends = await db('friends').insert({
    user_a: user_id,
    friend_id: sender
  });
  return insertIntoFriends;
};

exports.removeFriend = async (user_a, friend_id) => {
  const deletedFriend = await db('friends')
    .where('user_a', user_a)
    .andWhere('friend_id', friend_id)
    .delete();
  const deleteBoth = await db('friends')
    .where('user_a', friend_id)
    .andWhere('friend_id', user_a)
    .delete();
  return deleteBoth;
};

exports.requestFriend = async (user, newFriend) => {
  try {
    const request = (
      await db('requests')
        .insert({ sender: user, reciever: newFriend })
        .returning('*')
    )[0];
    return request;
  } catch (err) {
    console.log(err);
  }
};

exports.getListOfFriends = async (user_id) => {
  try {
    const list = await db('friends')
      .where('user_a', user_id)
      .distinctOn('friend_id')
      .select('friend_id')
      .returning('*');
    return list;
  } catch (err) {
    console.log(err);
  }
};
