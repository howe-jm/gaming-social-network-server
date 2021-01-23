const slugify = require('slugify');
const db = require('../knex/knex');

exports.insertGroup = async (
  user_id,
  group_name,
  group_description,
  image_url
) => {
  const entity = (await db('entity').insert({}).returning('*'))[0];
  const group = (
    await db('groups')
      .insert({
        entity_id: entity.id,
        user_id,
        group_name,
        group_description,
        image_url,
        slug: await slugify(group_name, {
          lower: true,
          strict: true
        })
      })
      .returning('*')
  )[0];
  return group;
};

exports.getGroups = async (searchTerm) => {
  try {
    let groups = await db('groups').returning('*');

    let filteredGroups = groups;

    if (searchTerm && searchTerm.trim('').length) {
      const results = filteredGroups.filter((group) =>
        group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filteredGroups = results;
    }

    return filteredGroups;
  } catch (err) {
    console.log(err);
  }
};

exports.retrieveGroup = async (slug, user) => {
  try {
    // need to get all group posts
    const group = (
      await db('groups').where({ slug: slug.toLowerCase() }).returning('*')
    )[0];

    return group;
  } catch (err) {
    console.log(err);
  }
};

exports.isUserInGroup = async (entity_id, group_id, user) => {
  const member = (
    await db('group_member').where({ entity_id, group_id, user_id: user.id })
  )[0];

  if (!member) {
    return false;
  }

  return true;
};

exports.insertMemberInGroup = async (entity_id, group_id, user) => {
  try {
    const member = await db('group_member')
      .insert({
        entity_id,
        group_id,
        user_id: user.id
      })
      .returning('*');
    return member;
  } catch (err) {
    console.log(err);
  }
};

exports.removeMemberFromGroup = async (entity_id, group_id, user) => {
  try {
    const member = await db('group_member')
      .where({
        entity_id,
        group_id,
        user_id: user.id
      })
      .delete()
      .returning('*');
    return member;
  } catch (err) {
    console.log(err);
  }
};

exports.getGroupMembers = async (group_id) => {
  const groupMembers = await db('group_member')
    .where({ group_id })
    .join('users', {
      'users.id': 'group_member.user_id'
    })
    .join('profiles', {
      'profiles.user_id': 'group_member.user_id'
    })
    .select(['username', 'profile_url', 'users.id']);
  return groupMembers;
};
