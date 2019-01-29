import express from 'express';

import CurrentUserController from '../controllers/current-user.controller';

const userRouter = express.Router();

userRouter.get('/current-user', CurrentUserController.currentUser);

export default userRouter;
