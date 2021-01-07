const { insertGroup } = require('../services/groupsService');

exports.createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const group = await insertGroup(req.user.id, groupName);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create group' }],
      });
    }

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
    const groups = await getGroups();

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
    const groups = await getGroups();
    const { searchTerm } = req.query;
    const filteredGroups = groups.filter((group) => group.group_name.includes(searchTerm));

    if (!filteredGroups) {
      return res.status(400).json({ success: false, errors: [{ message: 'Group not found' }] });
    }

    return res.status(200).json({ success: true, filteredGroups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, errors: [{ msg: 'Server error ' }] });
  }
};
