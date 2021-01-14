const { updateUserBio } = require('../services/profilesService');

exports.updateUserProfileBio = async (req, res) => {
    try {
        const { user_id, user_bio } = req.body;
        console.log(user_id, user_bio);
        const profile = await updateUserBio(user_bio, user_id);
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not update profile' }],
            });
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Could not update profile' }, { msg: err.message }],
        });
    }
};
