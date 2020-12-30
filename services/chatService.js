const db = require('../knex/knex');

exports.newConversation = (userId) => {
  return db('conversations').insert({ user_id: userId }).returning('*')[0];
};

exports.newMessage = (message) => {
  return db('messages').insert({ message: message }).returning('*')[0];
};

exports.deleteMessage = (id) => {
  return db('messages').delete({ id: id });
};

exports.addUserToConversation = (userId, conversationId) => {
  return db('conversations').insert({ user_id: userId, conversation_id: conversationId }).returning('*')[0];
};

exports.removeUserFromConversation = (user, conversation) => {
  return db('conversations').where('user_id', user).andWhere('conversation_id', conversation).delete();
};
