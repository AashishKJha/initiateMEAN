
export default class ModelToDTO {
    constructor(mod) {
        const model = JSON.parse(mod);
        this.newObj = {};
        Object.keys(model).forEach((key) => {
            let newKey = '';
            if (key.includes('_')) {
                const arr = key.split('_');
                [newKey] = arr;
                arr.slice(0).forEach((k, index) => {
                    if (index > 0 && k[0]) {
                        newKey += k[0].toUpperCase() + k.substr(1, k.length);
                    }
                });
            } else {
                newKey = key;
            }
            this.newObj[newKey] = model[key];
            newKey = '';
        });
    }

    getNewObj() {
        return this.newObj;
    }
}
