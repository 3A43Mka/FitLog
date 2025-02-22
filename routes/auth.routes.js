const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Min password length is 6 characters').isLength({ min: 6 })

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Invalid register data' });
            }
            const { email, password, fullname } = req.body;
            const candidate = await User.findOne({ email: email }).exec();
            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashedPassword, role: 'client', fullname: fullname, registered: Date.now() })
            await user.save();

            res.status(201).json({ message: 'User was registered' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

router.post('/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Invalid login data' });
            }
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if (!user) {
                return res.status(400).json({message: 'User wasn\'t found'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'});
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '10h'}
            )
            
            res.json({token, userId: user.id, userRole: user.role});
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' });
        }
    });

module.exports = router;