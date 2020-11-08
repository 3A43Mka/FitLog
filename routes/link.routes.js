const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Log = require('../models/Log');
const Link = require('../models/Link');
const router = Router();


    router.post('/addtrainer', auth, async (req, res) => {
        try {
            if (!req.body.client || !req.body.trainer) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            let user = await User.findOne({_id: req.user.userId});
            if (user.role !== 'admin' && user.role !=='trainer') {
                return res.status(401).json({ message: `Unauthorized for this action: role ${user.role}` });
            }
            // const log = new Log({trainer: user._id, client: req.body.client, eventType: 2, comment: req.body.comment, date: Date.now()});
            const link = new Link({trainer: req.body.trainer, client: req.body.client, date: Date.now()});
            await link.save();
            res.json({message: 'Link added'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/gettrainer', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const link = await Link.findOne({client: req.body.client}).sort({ date: -1 }).limit(1).populate("trainer", '-password');
            if (!link) {
                return res.status(400).json({ message: 'No trainer found' });
            }
            res.json(link.trainer);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

    

module.exports = router;