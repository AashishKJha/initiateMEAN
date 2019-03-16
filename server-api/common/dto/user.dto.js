import CommonDTO from './common.dto';

export default class UserDTO extends CommonDTO {
    constructor(userData, updatedAt, modelToDTO) {
        super(updatedAt);
        if (!modelToDTO) {
            this.firstName = userData.firstName;
            this.middleName = userData.middleName;
            this.lastName = userData.lastName;
            this.dateOfBirth = userData.dateOfBirth;
            this.email = userData.email;
            this.usertype = userData.usertype;
            this.mobileNumber = userData.mobileNumber;
        } else {
            this.firstName = userData.first_name;
            this.middleName = userData.middle_name;
            this.lastName = userData.last_name;
            this.email = userData.email;
            this.mobileNumber = userData.mobile_number;
            this.dateOfBirth = userData.date_of_birth;
            this.usertype = userData.user_type;
        }
    }

    get getFirstName() {
        return this.firstName;
    }

    set setFirstName(firstName) {
        this.firstName = firstName;
    }

    get getMiddleName() {
        return this.middleName;
    }

    set setMiddleName(middleName) {
        this.middleName = middleName;
    }

    get getLastName() {
        return this.lastName;
    }

    set setLastName(lastName) {
        this.lastName = lastName;
    }

    get getDateOfBirth() {
        return this.dateOfBirth;
    }

    set setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    get getEmail() {
        return this.email;
    }

    set setEmail(email) {
        this.email = email;
    }

    get getUserType() {
        return this.userType;
    }

    set setUserType(userType) {
        this.userType = userType;
    }

    get getMobileNumber() {
        return this.mobileNumber;
    }

    set setMobileNumber(mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    get updatedAtDate() {
        return this.updatedAt;
    }

    set updatedAtDate(updatedAt) {
        this.updatedAt = updatedAt;
    }
}
