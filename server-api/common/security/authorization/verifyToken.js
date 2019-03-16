import AppException from '../../errors/common.exception';
import { commonConstantsInst } from '../../constants/common.constants';
import ErrorResponse from '../../responses/errorResponse';
import TokenService from '../authentication/tokenGenerator';

class TokenVerification {
    constructor() {
        this.getToken = this.getToken.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    static isAuthorized(req, res, next) {
        const tokenVar = new TokenVerification();
        const token = tokenVar.getToken(req);
        if (!token) {
            const errorResp = new ErrorResponse(false, commonConstantsInst.UNAUTHORIZED_ERROR);
            next(new AppException(commonConstantsInst.UNAUTHORIZED_ERROR_CODE, errorResp));
        } else {
            tokenVar.getCurrentUser(req).then((auth) => {
                if (auth.success) {
                    next();
                } else {
                    next(new AppException(commonConstantsInst.UNAUTHORIZED_ERROR_CODE, new ErrorResponse(false, commonConstantsInst.UNAUTHORIZED_ERROR)));
                }
            });
        }
    }

    getToken(req) {
        return req.headers.authorization;
    }

    getCurrentUser(req) {
        return TokenService.verifyToken(this.getToken(req));
    }
}
export default TokenVerification;
