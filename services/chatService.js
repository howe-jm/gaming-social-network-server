const db = require('../knex/knex');

exports.newConversation = (user_id) => {
  try {
    return db('conversations').insert({ user_id }).returning('*')[0];
  } catch (err) {
    throw new Error('Cannot create new conversation');
  }
};

exports.newMessage = (message) => {
  try {
    return db('messages').insert({ message }).returning('*')[0];
  } catch (err) {
    throw new Error('Could not insert new message');
  }
};

exports.deleteMessage = (id) => {
  try {
    return db('messages').delete({ id });
  } catch (err) {
    throw new Error('Can not delete message');
  }
};

exports.addUserToConversation = (user_id, conversation_id) => {
  try {
    return db('conversations').insert({ user_id, conversation_id }).returning('*')[0];
  } catch (err) {
    throw new Error('Cannot add user to conversation');
  }
};

exports.removeUserFromConversation = (user, conversation) => {
  try {
    return db('conversations').where('user_id', user).andWhere('conversation_id', conversation).delete();
  } catch (err) {
    throw new Error('Cannot remove user from conversation');
  }
};
