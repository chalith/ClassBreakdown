export class JsonHelper {
    static copyObject(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    static cloneObject(obj: any) {
        let clone = {};
        for (let prop in obj) {
            if (this.isObject(obj[prop])) {
                clone[prop] = this.cloneObject(obj[prop]);
            }
            else {
                clone[prop] = obj[prop];
            }
        }
        return clone;
    }

    static isObject(value: any) {
        return value instanceof Array || value instanceof Object;
    }

    static serialize(item: any) {
        return JSON.stringify(item);
    }

    static deserilize<T>(value: string) {
        return JSON.parse(value) as T;
    }
}
