class CommonUtils {
    constructor() {

    }

    static converter(key) {
        let newKey = '';
        if (key.includes('_')) {
            const keyArr = key.split('_');
            [newKey] = keyArr;
            keyArr.slice(0).forEach((k, index) => {
                if (index > 0 && k[0]) {
                    newKey += k[0].toUpperCase() + k.substr(1, k.length);
                }
            });
        } else {
            newKey = key;
        }
        return newKey;
    }
}

export default CommonUtils;
