const { retrievePostComments } = require('../services/commentsService');
const {
  insertPost,
  getUserPosts,
  getFriendsId,
  getAllPosts
} = require('../services/postsService');
const { getListOfFriends } = require('../services/friendsService');

exports.createPost = async (req, res) => {
  try {
    const { post_text } = req.body;
    const user_id = req.user.id;
    const post = await insertPost(post_text, user_id);

    if (!post) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create post' }]
      });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not create post' }]
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const posts = await getUserPosts(user_id);

    if (!posts) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not get posts' }]
      });
    }

    res.status(200).json({
      success: true,
      posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get posts' }]
    });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const entity_id = req.params.entityId;
    const comments = await retrievePostComments(entity_id);

    if (!comments) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not get comments' }]
      });
    }

    res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get comments' }]
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const listOfFriends = await getListOfFriends(user_id);
    const arrFriends = listOfFriends.map((each) => each.friend_id);
    arrFriends.push(user_id);
    const posts = await getAllPosts(arrFriends);
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Could not get all posts' }]
    });
  }
};
