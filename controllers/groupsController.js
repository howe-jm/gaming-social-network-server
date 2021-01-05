const { insertGroup } = require('../services/groupsService');

exports.createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const group = await insertGroup(req.user.id, groupName);

    if (!group) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Could not create group' }]
      });
    }

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
