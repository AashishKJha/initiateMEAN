import CommonConstants from '../../common/constants/common.constants';

export default class AuthConstants extends CommonConstants {
   constructor() {
       super();
       // Static Messages

       this.INCORRECT_PASSWORD = 'Incorrect Password';
       this.SUCCESSFULLY_REGISTERED = 'Successfully Registered';
   }
}

export const authConstantsInst = new AuthConstants();
