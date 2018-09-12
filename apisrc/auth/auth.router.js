'strict';

import express from 'express';

import Authentication from './auth.component';

const authRouter = express.Router();

const auth = new Authentication();

authRouter.post('/login', auth.login);

authRouter.post('/register', auth.register);

export default authRouter;
