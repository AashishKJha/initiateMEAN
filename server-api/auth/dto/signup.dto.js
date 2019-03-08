import UserDTO from '../../common/dto/user.dto';

export default class SignupDTO extends UserDTO {
    constructor(userData, createdAt, updatedAt) {
        super(userData, updatedAt, false);
        this.password = userData.password;
        this.createAt = createdAt;
    }

    get getPassword() {
        return this.password;
    }

    set setPassword(password) {
        this.password = password;
    }

    get createdAtDate() {
        return this.createdAt;
    }

    set createdAtDate(createdAt) {
        this.createdAt = createdAt;
    }
}
