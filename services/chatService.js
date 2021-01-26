const db = require('../knex/knex');

exports.newConversation = (user_id) => {
  try {
    return db('conversations').insert({ user_id }).returning('*')[0];
  } catch (err) {
    console.log(err);
  }
};

exports.newMessage = (message) => {
  try {
    return db('messages').insert({ message }).returning('*')[0];
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMessage = (id) => {
  try {
    return db('messages').delete({ id });
  } catch (err) {
    console.log(err);
  }
};

exports.addUserToConversation = (user_id, conversation_id) => {
  try {
    return db('conversations').insert({ user_id, conversation_id }).returning('*')[0];
  } catch (err) {
    console.log(err);
  }
};

exports.removeUserFromConversation = (user, conversation) => {
  try {
    return db('conversations').where('user_id', user).andWhere('conversation_id', conversation).delete();
  } catch (err) {
    console.log(err);
  }
};
