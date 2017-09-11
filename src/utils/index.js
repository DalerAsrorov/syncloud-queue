import { find } from 'lodash';

export function checkProp(prop = {}, parentKey, ...otherKeys) {
    let result = '';

    if (prop[parentKey] && otherKeys) {
        const propParentNode = prop[parentKey];

        result = otherKeys.reduce((prevKey, key) => prevKey[key], propParentNode);
    }

    return result;
}

export function isInArray(item, array, property) {
    return find(array, el => el[`${property}`] === item[`${property}`]);
}
