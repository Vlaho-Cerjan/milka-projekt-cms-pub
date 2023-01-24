export const RemoveNullValues = (obj: any): any => {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
        if (value !== null) {
            acc[key] = value;
        }
        return acc;
    }, {});
}