import express from 'express';

import CurrentUserController from '../controllers/current-user.controller';

const userRouter = express.Router();

userRouter.route('/current-user')
.get(CurrentUserController.currentUser)
.post(CurrentUserController.updateUser);

export default userRouter;
