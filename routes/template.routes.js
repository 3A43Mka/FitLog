const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const Log = require('../models/Log');
const Template = require('../models/Template');
const router = Router();

    router.get('/', auth, async (req, res) => {
        try {
            let templates = await Template.find({trainer : req.user.userId});
            res.json(templates);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

    router.post('/', auth, async (req, res) => {
        try {
            if (!req.body.text || !req.body.title){
                return res.status(400).json({ message: 'Invalid data' });
            }
            const template = new Template({trainer: req.user.userId, title: req.body.title, text: req.body.text, date: Date.now()});
            await template.save();
            res.json({message: 'Success'});
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
    

module.exports = router;