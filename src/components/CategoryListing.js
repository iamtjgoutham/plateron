import React, { memo, useCallback, useMemo } from 'react';

import { TABLE_TYPE_VS_COMPONENT } from '../constants';
import { sortByDisplayOrder, getTableType } from '../helpers/common';

const CategoryList = ({ categories, items, itemsData }) => {
    const sortedCategories = useMemo(() => categories.sort(sortByDisplayOrder), [categories]);

    const tableItems = useCallback((categoryId) => items?.filter(item => item.CategoryID === categoryId), [items])

    const renderTable = useCallback((category) => {
        const { IsCollection, CategoryID } = category;
        const tableType = getTableType(IsCollection);
        const Table = TABLE_TYPE_VS_COMPONENT[tableType];
        const items = tableItems(CategoryID);
        return Table ? <Table category={category} items={items} itemsData={itemsData} /> : <></>;
    }, [tableItems, itemsData]);
 
    const renderCategories = useCallback(() => {
        const renderData = sortedCategories?.map(category => {
            return (
                <>
                    {renderTable(category)}
                </>
            )
        });
        return renderData;
    }, [sortedCategories, renderTable]);

    return (<>{renderCategories()}</>)
};

export default memo(CategoryList);
