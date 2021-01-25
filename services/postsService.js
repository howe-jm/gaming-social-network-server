const db = require('../knex/knex');

exports.insertPost = async (post_text, user_id) => {
    try {
        const entity = (await db('entity').insert({}).returning('*'))[0];

        const post = (
            await db('entity_post')
                .insert({ entity_id: entity.id, user_id, post_text })
                .returning('*')
        )[0];

        const joinedPost = (
            await db('entity_post')
                .where({
                    'entity_post.user_id': user_id,
                    'entity_post.id': post.id,
                })
                .join('users', {
                    'users.id': 'entity_post.user_id',
                })
                .join('profiles', {
                    'profiles.user_id': 'entity_post.user_id',
                })
                .returning('*')
        )[0];
        //   'entity_id', //   'entity_post.id', // .select([
        //   'profile_url',
        //   'entity_post.user_id',
        //   'post_text',
        //   'username',
        //   'created_at',
        //   'updated_at'
        // ])
        return joinedPost;
    } catch (err) {
        console.log(err);
    }
};

exports.getUserPosts = async (user_id) => {
    const posts = await db('entity_post')
        .where({ user_id })
        .join('users', {
            'users.id': 'entity_post.user_id',
        })
        .returning('*');
    // .select([
    //   'entity_id',
    //   'username',
    //   'post_text',
    //   'created_at',
    //   'last_updated'
    // ]);
    return posts;
};

exports.getAllPosts = async (ids) => {
    const allPosts = await db('entity_post')
        .where((builder) => builder.whereIn('user_id', ids))
        .join('users', { 'users.id': 'entity_post.user_id' })
        .returning('*');
    console.log(allPosts);
    return allPosts;
};

exports.updateUserPost = async (content, user_id) => {};

exports.removeUserPost = async (content, user_id) => {};
