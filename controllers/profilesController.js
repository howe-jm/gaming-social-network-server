const {
    updateUserBio,
    getUserImages,
    postUserImage,
    updateUserBanner,
    updateUserImage,
    updateHardware,
} = require('../services/profilesService');
const { getUserIdByName } = require('../services/usersService');

exports.updatePreferredHardware = async (req, res) => {
    try {
        const { user_id, hardware } = req.body;
        const profile = await updateHardware(user_id, hardware);

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
            errors: [
                { msg: 'Could not update profile hardware' },
                { msg: err.message },
            ],
        });
    }
};

exports.updateUserProfileBio = async (req, res) => {
    try {
        const { user_id, user_bio } = req.body;
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

exports.updateUserProfileBanner = async (req, res) => {
    try {
        const { user_id, banner_url } = req.body;
        const profile = await updateUserBanner(banner_url, user_id);
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not update profile banner' }],
            });
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [
                { msg: 'Could not update profile banner' },
                { msg: err.message },
            ],
        });
    }
};

exports.updateUserProfileImage = async (req, res) => {
    try {
        const { user_id, profile_url } = req.body;
        const profile = await updateUserImage(profile_url, user_id);
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not update profile image' }],
            });
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [
                { msg: 'Could not update profile image' },
                { msg: err.message },
            ],
        });
    }
};

exports.getAllUserImages = async (req, res) => {
    try {
        const { id } = await getUserIdByName(req.params.username);
        const images = await getUserImages(id);

        if (!images) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not get users images' }],
            });
        }

        res.status(200).json({
            success: true,
            images,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [
                { msg: 'Could not get user images' },
                { msg: err.message },
            ],
        });
    }
};

exports.postImage = async (req, res) => {
    try {
        const { user_id, imageURL } = req.body;
        const images = await postUserImage(user_id, imageURL);

        if (!images) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not post users images' }],
            });
        }

        res.status(200).json({
            success: true,
            images,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [
                { msg: 'Could not post user images' },
                { msg: err.message },
            ],
        });
    }
};
