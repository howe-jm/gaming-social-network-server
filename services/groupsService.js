const slugify = require('slugify');
const db = require('../knex/knex');

exports.insertGroup = async (user_id, group_name) => {
    const group = (
        await db('groups')
            .insert({
                user_id,
                group_name,
                slug: await slugify(group_name, {
                    lower: true,
                    strict: true,
                }),
            })
            .returning('*')
    )[0];
    return group;
};

exports.getGroups = async (group_name) => {
    const groups = await db('groups')
        .where('group_name', group_name)
        .returning('*');
    return groups;
};
