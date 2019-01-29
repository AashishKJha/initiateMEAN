import jwt from 'jsonwebtoken';
import config from '../../../config/config';

class TokenService {
    constructor(auth, userData) {
        this.auth = auth;
        this.userData = userData;
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getRefreshToken = this.getRefreshToken.bind(this);
        // this.verifyToken = this.verifyToken.bind(this);
    }

    getAccessToken() {
        return jwt.sign({ userData: this.userData }, config.jwtSecret);
    }

    getRefreshToken() {
        return jwt.sign({ userData: this.userData }, config.jwtSecret);
    }

    static verifyToken(token) {
        return new Promise((resolve) => {
            jwt.verify(token, config.jwtSecret, (err, data) => {
                if (err) {
                    resolve({ success: false });
                } else {
                    resolve({ success: true, data });
                }
            });
        });
    }
}

export default TokenService;
