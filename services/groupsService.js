const slugify = require('slugify');
const db = require('../knex/knex');

exports.insertGroup = async (
  user_id,
  group_name,
  group_description,
  image_url
) => {
  const entity = (await db('entity').insert({}).returning('*'))[0];
  console.log('asdfasw034', entity);
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

exports.retrieveGroup = async (slug) => {
  try {
    // need to get the group data itself
    // need to get all group members
    // need to get all group posts
    const group = (
      await db('groups').where({ slug: slug.toLowerCase() }).returning('*')
    )[0];
    const groupMembers = await db('groups')
      .where({ slug: slug.toLowerCase() })
      .returning('*');
    return group;
  } catch (err) {
    console.log(err);
  }
};
