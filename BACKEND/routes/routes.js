const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const authmiddleware = require('../middleware/authmiddleware');
const rolemiddleware = require('../middleware/rolemiddleware');

router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/protected',authmiddleware, controller.protected);

router.get('./admin', authmiddleware, rolemiddleware('admin'), (req,res)=>
{
    res.json({message: 'welcome Admin'});
})

module.exports = router;

