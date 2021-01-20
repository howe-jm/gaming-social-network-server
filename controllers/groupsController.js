const { insertGroup, getGroups, retrieveGroup } = require('../services/groupsService');

exports.createGroup = async (req, res) => {
  try {
    const { group_name } = req.body;
    const image_url = req.file.location;

    const group = await insertGroup(req.user.id, group_name, image_url);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create group' }],
      });
    }

    console.log(group);

    res.status(200).json({
      success: true,
      group,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error' }],
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
      errors: [{ msg: 'Server error' }],
    });
  }
};

exports.filterGroups = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const groups = await getGroups();

    const filteredGroups = groups.filter((group) => group.group_name.includes(searchTerm));

    if (!filteredGroups) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Group not found?' }],

    if (!groups) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not get groups' }]

      });
    }

    return res.status(200).json({ success: true, groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error ' }],
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { slug } = req.params;
    const group = await retrieveGroup(slug);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ message: 'Group not found' }],
      });
    }

    return res.status(200).json({ success: true, group });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error ' }],
    });
  }
};
