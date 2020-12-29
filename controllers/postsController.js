const { insertPost, getUserPosts } = require('../services/postsService');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user_id = req.user.id;
    const post = await insertPost(content, user_id);

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