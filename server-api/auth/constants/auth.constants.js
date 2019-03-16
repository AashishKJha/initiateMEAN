import CommonConstants from '../../common/constants/common.constants';

export default class AuthConstants extends CommonConstants {
   constructor() {
       super();
       // Static Messages

       this.INCORRECT_PASSWORD = 'Incorrect Password';
       this.SUCCESSFULLY_REGISTERED = 'Successfully Registered';
       this.USER_ALREADY_EXIST = 'User Already Exist';
   }
}

export const authConstantsInst = new AuthConstants();
