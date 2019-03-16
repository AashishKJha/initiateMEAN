import bcrypt from 'bcrypt';
import CommonUtils from '../../utils/common.utils';

class SecurityUtils extends CommonUtils {
    constructor(password) {
      super();
      this.password = password;
    }

    validatePassword(encryptedPassword) {
        return bcrypt.compare(this.password, String(encryptedPassword));
    }

    static getEncryptedPassword(password) {
        return bcrypt.hashSync(password, 8);
    }
}
export default SecurityUtils;
