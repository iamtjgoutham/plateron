import { TABLE_TYPE } from '../constants';

export const _head = (data) => data.length > 0 ? data[0] : [];

export const sortByDisplayOrder = (a = 0, b = 1) => a?.DisplayOrder - b?.DisplayOrder;

export const getTableType = (isStatic) => TABLE_TYPE[isStatic];
