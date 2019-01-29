import CommonController from '../../common/controllers/common.controller';
import authModel from '../../auth/models/auth.model';
import TokenVerification from '../../common/security/authorization/verifyToken';
import AppException from '../../common/errors/common.exception';
import { commonConstantsInst } from '../../common/constants/common.constants';
import ErrorResponse from '../../common/responses/errorResponse';
import SuccessResponse from '../../common/responses/successResponse';

class CurrentUserController extends CommonController {
    static currentUser(req, res, next) {
        const tokenVar = new TokenVerification();
        tokenVar.getCurrentUser(req).then((user) => {
            if (user.success) {
                const currentUser = user.data.userData;
                authModel.find({ email: currentUser.email }, (userError, resp) => {
                    if (userError) {
                        next(new AppException(commonConstantsInst.UNAUTHORIZED_ERROR_CODE, new ErrorResponse(false, commonConstantsInst.USER_NOT_FOUND)));
                    } else if (!user) {
                        next(new AppException(commonConstantsInst.UNAUTHORIZED_ERROR_CODE, new ErrorResponse(false, commonConstantsInst.USER_NOT_FOUND)));
                    } else {
                        const finalUser = resp[0];
                        finalUser.password = undefined;
                        res.status(200).send(new SuccessResponse(finalUser));
                    }
                });
            }
        });
    }
}

export default CurrentUserController;
