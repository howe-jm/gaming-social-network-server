const db = require('../knex/knex');

//user_a is requesting, user_b is the receiving
//function returns all requests received
exports.getFriendReqs = async (user_b) => {
  try {
    const friends = await db.from('friends').where('user_b', user_b).returning('*');
    return friends;
  } catch (err) {
    console.log(err);
  }
};

//function returns all outgoing friend requests
exports.getSentReqs = async (user_a) => {
  try {
    const friends = await db.from('friends').where('user_a', user_a).returning('*');
    return friends;
  } catch (err) {
    console.log(err);
  }
};

exports.getCurrentFriends = async (user_id) => {
  try {
    const friends = await db
      .from('friends')
      .where('user_a', user_id)
      .distinctOn('friend_id')
      .join('users', { 'users.id': 'friends.friend_id' })
      .select('username', 'friend_id', 'user_a')
      .returning('*');
    return friends;
  } catch (err) {
    console.log(err);
  }
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
  try {
    const sentReqs = await db
      .from('requests')
      .where('sender', user_id)
      .join('users', { 'users.id': 'requests.reciever' })
      .select('username', 'reciever', 'requests.id')
      .returning('*');
    return sentReqs;
  } catch (err) {
    console.log(err);
  }
};

exports.acceptFriend = async (id, sender, user_id) => {
  try {
    const acceptedFriend = await db.from('requests').where('id', id).delete();
    const insertIntoFriends = (
      await db('friends')
        .insert({
          user_a: sender,
          friend_id: user_id,
        })
        .returning('*')
    )[0];
    const insertUserIntoFriends = (
      await db('friends')
        .insert({
          user_a: user_id,
          friend_id: sender,
        })
        .returning('*')
    )[0];
    return { insertIntoFriends, insertUserIntoFriends };
  } catch (err) {
    console.log(err);
  }
};

exports.declineFriend = async (id) => {
  const declinedFriend = await db.from('requests').where('id', id).delete();
  return declinedFriend;
};

exports.removeFriend = async (user_a, friend_id) => {
  try {
    const deletedFriend = await db('friends').where('user_a', user_a).andWhere('friend_id', friend_id).delete();
    const deleteBoth = await db('friends').where('user_a', friend_id).andWhere('friend_id', user_a).delete();
    return deleteBoth;
  } catch (err) {
    console.log(err);
  }
};

exports.requestFriend = async (user, newFriend) => {
  try {
    const request = (await db('requests').insert({ sender: user, reciever: newFriend }).returning('*'))[0];
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
