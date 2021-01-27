const {
  insertGroup,
  retrieveGroups,
  retrieveGroup,
  retrieveGroupMembers,
  insertMemberInGroup,
  removeMemberFromGroup,
  isUserInGroup,
  insertGroupPost,
  retrieveGroupPosts,
  isUserGroupAdmin,
  checkIfGroupExists
} = require('../services/groupsService');

exports.createGroup = async (req, res) => {
  try {
    const { group_name } = req.body;
    const user = req.user;
    const image_url = req.file.location;

    if (group_name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Group name must be at least 3 characters long.'
          }
        ]
      });
    }

    if (group_name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg: 'Group name cannot be longer than 50 characters.'
          }
        ]
      });
    }

    const groupExists = await checkIfGroupExists(group_name);

    if (groupExists) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            msg:
              'Group name already exists. Please choose a different group name.'
          }
        ]
      });
    }

    const group = await insertGroup(user.id, group_name, image_url);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create group' }]
      });
    }

    await insertMemberInGroup(group.entity_id, group.id, user);

    res.status(200).json({
      success: true,
      group
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }]
    });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const groups = await retrieveGroups(searchTerm);

    return res.status(200).json({ success: true, groups });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }]
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { slug } = req.params;
    const user = req.user;
    const group = await retrieveGroup(slug, user);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Group not found' }]
      });
    }

    const isMember = await isUserInGroup(group.entity_id, group.id, user);
    const isAdmin = await isUserGroupAdmin(group.entity_id, group.id, user);
    const members = await retrieveGroupMembers(group.id);

    return res
      .status(200)
      .json({ success: true, group, members, isMember, isAdmin });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error ' }]
    });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const members = await retrieveGroupMembers(id);

    if (!members) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Could not get group members' }]
      });
    }

    return res.status(200).json({ success: true, members });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }]
    });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const user = req.user;
    const { entity_id, group_id } = req.body;

    const member = await insertMemberInGroup(entity_id, group_id, user);

    if (!member) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Could not join group' }]
      });
    }

    return res.status(200).json({ success: true, member });
  } catch (err) {
    console.log(err);
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const user = req.user;
    const { entity_id, group_id } = req.body;

    const member = await removeMemberFromGroup(entity_id, group_id, user);

    if (!member) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Could not leave group' }]
      });
    }

    return res.status(200).json({ success: true, member });
  } catch (err) {
    console.log(err);
  }
};

exports.createGroupPost = async (req, res) => {
  try {
    const user = req.user;
    const group_id = req.params.id;
    const { entity_id, post_text } = req.body;

    const post = await insertGroupPost(group_id, entity_id, post_text, user.id);

    if (!post) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Could not create post' }]
      });
    }

    return res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }]
    });
  }
};

exports.getGroupPosts = async (req, res) => {
  try {
    const group_id = req.params.id;

    const posts = await retrieveGroupPosts(group_id);

    if (!posts) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Could not get posts' }]
      });
    }

    return res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }]
    });
  }
};
