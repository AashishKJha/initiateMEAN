import CommonDTO from '../../common/dto/common.dto';

export default class LoginDTO extends CommonDTO {
    constructor() {
        super();
        this.email = null;
        this.password = null;
    }
}
