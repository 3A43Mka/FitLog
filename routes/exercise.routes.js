const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Log = require('../models/Log');
const Exercise = require('../models/Exercise');
const router = Router();


    router.post('/addexercise', auth, async (req, res) => {
        try {
            if (!req.body.client || !req.body.title || !req.body.quantity) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            // const log = new Log({trainer: user._id, client: req.body.client, eventType: 2, comment: req.body.comment, date: Date.now()});
            const exercise = new Exercise({client: req.body.client, title: req.body.title, quantity: +req.body.quantity, weights: +req.body.weights || 1 , date: Date.now()});
            await exercise.save();
            res.json({message: 'Exercise added'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/getexercises', auth, async (req, res) => {
        try {
            if (!req.body.client) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const exercises = await Exercise.find({client: req.body.client}).sort({ date: -1 });
            res.json(exercises);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

    

module.exports = router;