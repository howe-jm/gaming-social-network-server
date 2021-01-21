const { insertComment } = require('../services/commentsService');

exports.createComment = async (req, res) => {
    try {
        const { comment_text, entity_id } = req.body;
        const user_id = req.user.id;
        const comment = await insertComment(entity_id, user_id, comment_text);
        if (!comment) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not create comment' }],
            });
        }

        res.status(200).json({
            success: true,
            comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not create comment' }],
        });
    }
};
