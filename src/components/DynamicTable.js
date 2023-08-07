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
                <th>{}</th>
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

    const handleDeleteRow = useCallback((id) => {
        const rowsAfterDelete = rows.filter(row => row.RowWiseDisplayOrder !==id);
        setRows(rowsAfterDelete);
    }, [rows])

    const handleChange = useCallback((e, rowValues) => {
        const { id, value, selectedIndex } = e.target;
        let values;
        const { DropDownID, RowWiseDisplayOrder, ColumnWiseDisplayOrder } = rowValues;
        if(e.target.nodeName === 'SELECT') {
            const selectedDropDownOptions = getDropdownOptions(DropDownID);
            const selectedValue = selectedDropDownOptions.filter((_, index) => index === selectedIndex)[0].DropDownValueID;
            values = selectedValue;
        } else {
            values = value;
        }
        const updatedRows = rows.map(row => {
            if (row.ColumnWiseDisplayOrder === ColumnWiseDisplayOrder &&
            row.RowWiseDisplayOrder === RowWiseDisplayOrder) {
                row[id] = values;
            }
            return row;
        });
        setRows(updatedRows);
    }, [rows, getDropdownOptions]); 

    const renderSubRows = useCallback(() => {
        const sortedRows = rows?.sort((a,b) => a.RowWiseDisplayOrder - b.RowWiseDisplayOrder);
        const uniqueRowOrders = [...new Set(sortedRows.map(item => item.RowWiseDisplayOrder))];
        const uniqueRowData = [...new Set(uniqueRowOrders.map(order => sortedRows.filter(row => row.RowWiseDisplayOrder === order)))];
        return uniqueRowData
              .map((item, index) => <tr><td>
                        {index !==0 &&
                            <button id={item[index].RowWiseDisplayOrder} onClick={e => handleDeleteRow(item[index].RowWiseDisplayOrder)}>Delete</button>
                         } </td>
                        {item.map(data => {
                        const { InputID, DropDownID, ColumnWiseDisplayOrder, RowWiseDisplayOrder } = data;
                        const compId = category.CategoryID.toString() + '-' + ColumnWiseDisplayOrder + '-' + RowWiseDisplayOrder;
                        const Component = INPUT_TYPE[InputID];
                        const dropdownOptions = getDropdownOptions(DropDownID);
                        return <td id={RowWiseDisplayOrder} colSpan={Object.keys(data).length}>
                                <Component id={compId} value={data[compId] || ''} options={dropdownOptions} onChange={(e) => handleChange(e, data)} />
                            </td>})}
                </tr>
              )
    },[rows, getDropdownOptions, handleDeleteRow, category, handleChange]);

    const addNewRow = () => {
        const maxRowIndex = rows.reduce((max, item) => {
            const rowIndex = item.RowWiseDisplayOrder;
            return rowIndex > max ? rowIndex : max;
          }, 0);
        const lastRow = rows.filter(row => row.RowWiseDisplayOrder === maxRowIndex);
        const newRows = lastRow.map(row => {
            const lastRowCompId =category.CategoryID.toString() + '-' + row.ColumnWiseDisplayOrder + '-' + maxRowIndex;
            const compId =  category.CategoryID.toString() + '-' + row.ColumnWiseDisplayOrder + '-' + (maxRowIndex + 1);
            const compValue = row[lastRowCompId];
            return ({ ...row, RowWiseDisplayOrder: maxRowIndex + 1, [compId]: compValue})
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
