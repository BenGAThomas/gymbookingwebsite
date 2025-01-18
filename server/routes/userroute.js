import express from 'express'
// import bcrypt from 'bcrypt'
// import { User } from '../models/User.js';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

/*router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    const user = User.find({email})
    if(user) {
        return res.json({message: "User already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword
    })

    await newUser.save()
    return res.json({message: "record registered User"})
})
    */

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verifyEmail', verifyEmail);

router.post('/forgotpassword', forgotPassword);

router.post('/resetpassword/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

export {router as UserRouter}