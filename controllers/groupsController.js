const {
  insertGroup,
  getGroups,
  retrieveGroup,
  getGroupMembers
} = require('../services/groupsService');

exports.createGroup = async (req, res) => {
  try {
    const { group_name, group_description } = req.body;
    const image_url = req.file.location;

    const group = await insertGroup(
      req.user.id,
      group_name,
      group_description,
      image_url
    );

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create group' }]
      });
    }

    console.log(group);

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
    const groups = await getGroups(searchTerm);

    return res.status(200).json({ success: true, groups });
  } catch (err) {
    console.log(err);
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
    const group = await retrieveGroup(slug);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Group not found' }]
      });
    }

    const members = await getGroupMembers(group.id, user);
    // console.log(members);

    return res.status(200).json({ success: true, group });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error ' }]
    });
  }
};

exports.joinGroup = async (req, res) => {};
exports.leaveGroup = async (req, res) => {};
