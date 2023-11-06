export const paramToArray = (param: string) => {
    if (Array.isArray(param)) {
        return param;
    }
    return param.split(',')
}
