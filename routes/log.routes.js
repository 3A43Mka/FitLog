const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Log = require('../models/Log');
const router = Router();

// 1 - assign trainer to client
// 2 - create program

    router.post('/createprogram', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            let user = await User.findOne({_id: req.user.userId});
            if (user.role !== 'admin' && user.role !=='trainer') {
                return res.status(401).json({ message: `Unauthorized for this action: role ${user.role}` });
            }
            console.log(req.body.client);
            const log = new Log({trainer: user._id, client: req.body.client, eventType: 2, comment: req.body.comment, date: Date.now()});
            await log.save();
            res.json({message: 'Program added'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/getprogram', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const program = await Log.findOne({client: req.body.client, eventType: 2}).sort({ date: -1 }).limit(1);
            if (!program) {
                return res.status(400).json({ message: 'No program found' });
            }
            res.json(program);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

module.exports = router;