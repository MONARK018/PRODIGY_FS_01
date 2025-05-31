import express from 'express';
import { register, login, protectedRoute } from '../controllers/controllers.js';
import authmiddleware from '../middleware/authmiddleware.js';
import rolemiddleware from '../middleware/rolemiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authmiddleware, protectedRoute);

router.get('/admin', authmiddleware, rolemiddleware('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

export default router;