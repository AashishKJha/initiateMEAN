class CommonModel {
    createdAt = null;

    constructor(createdAt, updatedAt) {
        this.createdAt = { type: Date, default: createdAt };
        this.updatedAt = { type: Date, default: updatedAt };
    }
}

export default CommonModel;
