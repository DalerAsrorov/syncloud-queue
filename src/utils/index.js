export function checkProp(prop = {}, parentKey, ...otherKeys) {
    let result = '';

    if (prop[parentKey] && otherKeys) {
        const propParentNode = prop[parentKey];

        result = otherKeys.reduce((prevKey, key) => prevKey[key], propParentNode);
    }

    return result;
}
