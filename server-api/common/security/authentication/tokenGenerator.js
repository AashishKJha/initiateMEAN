import jwt from 'jsonwebtoken';
import config from '../../../config/config';

class TokeGenerator {
    constructor(auth, userData) {
        this.auth = auth;
        this.userData = userData;
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getRefreshToken = this.getRefreshToken.bind(this);
    }

    getAccessToken() {
        return jwt.sign({ userData: this.userData }, config.jwtSecret);
    }

    getRefreshToken() {
        return jwt.sign({ userData: this.userData }, config.jwtSecret);
    }
}

export default TokeGenerator;
