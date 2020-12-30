const db = require('../knex/knex');

exports.newConversation = (user_id) => {
  return db('conversations').insert({ user_id }).returning('*')[0];
};

exports.newMessage = (message) => {
  return db('messages').insert({ message }).returning('*')[0];
};

exports.deleteMessage = (id) => {
  return db('messages').delete({ id });
};

exports.addUserToConversation = (user_id, conversation_id) => {
  return db('conversations').insert({ user_id, conversation_id }).returning('*')[0];
};

exports.removeUserFromConversation = (user, conversation) => {
  return db('conversations').where('user_id', user).andWhere('conversation_id', conversation).delete();
};
