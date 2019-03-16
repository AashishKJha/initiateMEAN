'strict';

import express from 'express';
import authRouter from './auth/routes/auth.router';
import userRoute from './user/routes/users.route';
import TokenVerification from './common/security/authorization/verifyToken';


const router = express.Router();
router.use('/auth', authRouter);
router.use('/user', TokenVerification.isAuthorized, userRoute);


// Error Handling middle-ware
router.use((err, req, res, next) => {
    res.status(err.status).send(err.data);
});
export default router;
