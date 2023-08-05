import React, { useCallback} from 'react';

import { INPUT_TYPE } from '../constants';

import '../App.css';

const StaticTable = ({ items, category, itemsData }) => {
    const renderHeader = useCallback(() => {
        const { CategoryID = '', CategoryName = ''} = category || {};
        return (
            <thead>
                <tr className='row' aria-rowspan={2}>
                    <th key={CategoryID}>{CategoryName}</th>
                </tr>
            </thead>
        )
    }, [category]);

    const getDropdownOptions = useCallback((dropdownId) => {
        if(!dropdownId && dropdownId === null) return [];
        return itemsData.filter(item => item.DropDownID === dropdownId);
    }, [itemsData]);

    const renderTable = useCallback(() => {
        if (items?.length === 0) return null;
        let rows = {};
        items.forEach((item) => {
            const rowIndex = item.RowWiseDisplayOrder || 1;
            if (!rows[rowIndex]) {
                rows[rowIndex] = { columns: [] };
            }
            const { InputID, DropDownID } = item;
            const dropdownOptions = getDropdownOptions(DropDownID);
            const Component = INPUT_TYPE[InputID] || <></>;
            if (item.ColumnWiseDisplayOrder === 1) {
                rows[rowIndex].columns[0] = {
                    Component,
                    value: item.Name
                };
            } else {
                rows[rowIndex].columns[1] = {
                    Component,
                    dropdownOptions
                };
            }
        });

        return Object.keys(rows).map((rowIndex) => {
            const { columns } = rows[rowIndex];
            const Component1 = columns[0].Component;
            const Component2 = columns[1].Component;
            return (
                <tr className='row' key={rowIndex}>
                    <td>{Component1 && <Component1 value={columns[0].value} />}</td>
                    <td>{Component2 && <Component2 value={columns[1].value} options={columns[1].dropdownOptions} />}</td>
                </tr>
            );
        });
    }, [items, getDropdownOptions]);

return (
    <table>
        {renderHeader()}
        {renderTable()}
    </table>
);
};

export default React.memo(StaticTable);
