'strict';

import jwt from 'jsonwebtoken';
import { AuthModel } from '../auth/auth.component';
import config from '../config/config';

const User = AuthModel;

export default class UserProfile {
    constructor() { }

    getUserProfile(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    console.log(decoded);
                    User.find({ username: decoded.username },
                        (userError, user) => {
                            if (userError) {
                                res.status(500).send('There was a problem finding the user.');
                            } else if (!user) {
                                res.status(404).send('No user found.');
                            } else {
                                res.status(200).send(user);
                            }
                        });
                }
            });
        }
    }
}
