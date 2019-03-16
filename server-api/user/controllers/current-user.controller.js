import CommonController from '../../common/controllers/common.controller';
import AuthModel from '../../auth/models/auth.model';
import TokenVerification from '../../common/security/authorization/verifyToken';
import AppException from '../../common/errors/common.exception';
import { commonConstantsInst } from '../../common/constants/common.constants';
import ErrorResponse from '../../common/responses/errorResponse';
import SuccessResponse from '../../common/responses/successResponse';
import UserDTO from '../../common/dto/user.dto';

class CurrentUserController extends CommonController {
    static currentUser(req, res, next) {
        const tokenVar = new TokenVerification();
        tokenVar.getCurrentUser(req).then((user) => {
            if (user.success) {
                const currentUser = user.data.userData;
                AuthModel.findOne({ email: currentUser.email }, (userError, userData) => {
                    if (userError || !userData) {
                        next(new AppException(commonConstantsInst.UNAUTHORIZED_ERROR_CODE, new ErrorResponse(false, commonConstantsInst.USER_NOT_FOUND)));
                    } else {
                        res.status(200).send(new SuccessResponse(new UserDTO(userData, userData.createAt, userData.updatedAt, true)));
                    }
                });
            }
        });
    }

    static updateUser(req, res, next) {
        const auth = new AuthModel({

        });
    }
}

export default CurrentUserController;
