'strict';

import express from 'express';
import LoginController from '../controllers/login.controller';
import SignupController from '../controllers/signup.controller';

const authRouter = express.Router();

authRouter.post('/login', LoginController.login);

authRouter.post('/register', SignupController.register);

authRouter.use((err, req, res, next) => {
   res.status(err.status).send(err.data);
});

export default authRouter;
