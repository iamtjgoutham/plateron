import React, { useMemo, useState, useCallback } from 'react';

import { INPUT_TYPE } from '../constants';

import { sortByDisplayOrder } from '../helpers/common';

const DynamicTable = ({ items, category, itemsData }) => {
    const headers = useMemo(() => items.filter((item) => item.IsHeader === "Y"), [items]);

    const [rows, setRows] = useState(items.filter((item) => item.IsHeader !== "Y"));

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

    const renderTableRowHeader = useCallback(() => {
        const sortedHeaders = headers.sort(sortByDisplayOrder);
        return (
            <tr>
                {sortedHeaders.map((header, index) => 
                    <React.Fragment key={index}>
                        <th colSpan={Object.keys(header).length}>{header.Name}</th>
                    </React.Fragment>
                )} 
            </tr>);
    }, [headers]);

    const getDropdownOptions = useCallback((dropdownId) => {
        if(!dropdownId && dropdownId === null) return [];
        const dropdownOptions = itemsData.filter(item => item.DropDownID === dropdownId);
        return dropdownOptions;
    }, [itemsData]);

    const renderSubRows = useCallback(() => {
        const sortedRows = rows.sort((a,b) => a.RowWiseDisplayOrder - b.RowWiseDisplayOrder);
        const uniqueRowOrders = [...new Set(sortedRows.map(item => item.RowWiseDisplayOrder))];
        const uniqueRowData = [...new Set(uniqueRowOrders.map(order => sortedRows.filter(row => row.RowWiseDisplayOrder === order)))];
        return uniqueRowData
              .map((item) => <tr>
                        {item.map(data => {
                        const { InputID, DropDownID, RowWiseDisplayOrder } = data;
                        const Component = INPUT_TYPE[InputID];
                        const dropdownOptions = getDropdownOptions(DropDownID);
                        return <td id={RowWiseDisplayOrder} colSpan={Object.keys(data).length}>
                                <Component value={data.value} options={dropdownOptions} onChange={() => {}} />
                            </td>})}
                </tr>
              )
    },[rows, getDropdownOptions]);

    const addNewRow = () => {
        const maxRowIndex = rows.reduce((max, item) => {
            const rowIndex = item.RowWiseDisplayOrder;
            return rowIndex > max ? rowIndex : max;
          }, 0);
        const lastRow = rows.filter(row => row.RowWiseDisplayOrder === maxRowIndex);
        const newRows = lastRow.map(row => {
            return ({ ...row, RowWiseDisplayOrder: maxRowIndex + 1})
        });
        setRows(prevRows => [...prevRows, ...newRows]);
    };

    return (
        <table>
            {renderHeader()}
            {renderTableRowHeader()}
            {renderSubRows()}
            <tfoot>
                <tr>
                    <td colSpan={Object.keys(headers[0]).length}>
                        <button onClick={addNewRow}>Add New Row</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default DynamicTable;
