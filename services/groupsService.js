const slugify = require('slugify');
const db = require('../knex/knex');

exports.insertGroup = async (user_id, group_name, image_url) => {
  const entity = (await db('entity').insert({}).returning('*'))[0];
  const group = (
    await db('groups')
      .insert({
        entity_id: entity.id,
        user_id,
        group_name,
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

exports.checkIfGroupExists = async (group_name) => {
  const group = (
    await db('groups')
      .where({
        slug: await slugify(group_name, {
          lower: true,
          strict: true
        })
      })
      .returning('*')
  )[0];

  if (!group) {
    return false;
  }

  return true;
};

exports.retrieveGroups = async (searchTerm) => {
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
    const group = (
      await db('groups').where({ slug: slug.toLowerCase() }).returning('*')
    )[0];

    return group;
  } catch (err) {
    console.log(err);
  }
};

exports.retrieveGroupPosts = async (group_id) => {
  const posts = await db('group_post')
    .where({ group_id })
    .join('users', {
      'users.id': 'group_post.user_id'
    })
    .join('profiles', {
      'profiles.user_id': 'group_post.user_id'
    })
    .select([
      'users.id',
      'users.username',
      'group_post.created_at',
      'group_post.post_text',
      'group_post.entity_id',
      'profiles.profile_url'
    ])
    .orderBy('group_post.created_at', 'desc');
  return posts;
};

exports.insertGroupPost = async (group_id, entity_id, post_text, user_id) => {
  try {
    const post = (
      await db('group_post')
        .insert({
          group_id,
          entity_id,
          post_text,
          user_id
        })
        .returning('*')
    )[0];
    const joinedPost = (
      await db('group_post')
        .where({
          'group_post.user_id': user_id,
          'group_post.id': post.id
        })
        .join('users', {
          'users.id': 'group_post.user_id'
        })
        .join('profiles', {
          'profiles.user_id': 'group_post.user_id'
        })
        .select([
          'users.id',
          'users.username',
          'group_post.created_at',
          'group_post.post_text',
          'group_post.entity_id',
          'profiles.profile_url'
        ])
    )[0];
    console.log(joinedPost);
    return joinedPost;
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

exports.isUserGroupAdmin = async (entity_id, group_id, user) => {
  try {
    const admin = (
      await db('groups').where({ entity_id, id: group_id, user_id: user.id })
    )[0];

    if (!admin) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
  }
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

exports.retrieveGroupMembers = async (group_id) => {
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

exports.insertPostComment = async (entity_id, user_id, comment_text) => {
  try {
    const comment = (
      await db('group_comment')
        .insert({
          entity_id,
          user_id,
          comment_text
        })
        .returning('*')
    )[0];

    const joinedComment = (
      await db('group_comment')
        .where({
          'group_comment.user_id': user_id,
          'group_comment.id': comment.id
        })
        .join('users', {
          'users.id': 'group_comment.user_id'
        })
        .join('profiles', {
          'profiles.user_id': 'group_comment.user_id'
        })
        .returning('*')
    )[0];
    return joinedComment;
  } catch (err) {
    console.log(err);
  }
};

exports.retrievePostComments = async (entity_id) => {
  try {
    const comments = await db('group_comment')
      .where({ entity_id })
      .join('users', {
        'users.id': 'group_comment.user_id'
      })
      .join('profiles', {
        'profiles.user_id': 'group_comment.user_id'
      })
      .returning('*');
    return comments;
  } catch (err) {
    console.log(err);
  }
};
