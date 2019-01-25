'strict';

import jwt from 'jsonwebtoken';
import AuthModel from '../auth/models/auth.model';
import config from '../config/config';


export default class UserProfile {
    constructor() {
        this.User = AuthModel;
     }

    getUserProfile(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if (err) {
                    res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    this.User.find({ username: decoded.username },
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
