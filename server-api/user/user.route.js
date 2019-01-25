import express from 'express';

import UserProfile from './user.controller';

const userRouter = express.Router();

const user = new UserProfile();

userRouter.use('/profile', user.getUserProfile);

export default userRouter;
