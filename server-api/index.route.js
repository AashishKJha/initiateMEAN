'strict';

import express from 'express';

import authRouter from './auth/routes/auth.router';

import userRoute from './user/user.route';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', userRoute);

export default router;
