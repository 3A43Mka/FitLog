const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Log = require('../models/Log');
const Link = require('../models/Link');
const router = Router();

// 1 - assign trainer to client
// 2 - create program
// 3 - send notification to client
// 4 - visit
// 5 - send notification to trainer

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

    router.post('/sendnotification', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            console.log(req.body.client);
            if (req.body.clientToTrainer){
                const link = await Link.findOne({client: req.body.client}).sort({ date: -1 }).limit(1);
                const log = new Log({trainer: link.trainer, client: req.body.client, eventType: 5, comment: req.body.comment, date: Date.now()});
                await log.save();    
            } else {
                const log = new Log({trainer: req.user.userId, client: req.body.client, eventType: 3, comment: req.body.comment, date: Date.now()});
                await log.save();    
            }
            res.json({message: 'Notification sent!'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/getnotifications', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            let notifications = await Log.find({client: req.body.client, eventType: 3}).sort({ date: -1 }).populate("trainer", '-password').populate("client", '-password');
            let clientNotifications = await Log.find({client: req.body.client, eventType: 5}).sort({ date: -1 }).populate("trainer", '-password').populate("client", '-password');
            notifications = notifications.concat(clientNotifications);
            notifications.sort((a,b)=>new Date(b.date) - new Date(a.date));
            res.json(notifications);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

    router.post('/registervisit', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            if (req.body.client != req.user.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const log = new Log({trainer: req.body.trainer, client: req.body.client, eventType: 4, date: Date.now()});
            await log.save();
            res.json({message: 'Visit registered!'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/getlastvisit', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }

            const lastVisit = await Log.findOne({client: req.body.client, eventType: 4}).sort({ date: -1 }).limit(1);
            if (!lastVisit) {
                return res.status(400).json({ message: 'No visits' });
            }
            res.json(lastVisit);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/getvisits', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const visits = await Log.find({client: req.body.client, eventType: 4}).sort({ date: -1 }).limit(10);
            if (visits.length == 0) {
                return res.status(400).json({ message: 'No visits' });
            }
            res.json(visits);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

module.exports = router;