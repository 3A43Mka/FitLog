const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const router = Router();

    router.get('/me', auth, async (req, res) => {
        try {
            let user = await User.findOne({_id: req.user.userId});
            if (!user) {
                return res.status(400).json({ message: 'User wasn\'t found' });
            }
            user = {id: user.id, email: user.email, role: user.role, fullname: user.fullname, registered: user.registered};
            res.json(user);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

    router.get('/all', auth, async (req, res) => {
        try {
            console.log(req.user.userId);
            let user = await User.findOne({_id: req.user.userId});
            console.log(user);
            if (user.role !== 'admin' && user.role !=='trainer') {
                return res.status(401).json({ message: `Unauthorized for this action: role ${user.role}` });
            }
            let users = await User.find().select("-password");
            res.json(users);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

module.exports = router;