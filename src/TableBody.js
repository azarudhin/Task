import React, { useState, useRef } from "react";
import TableChildItem from "./TableChildItem";

function TableBody({ item, index }) {
    const [tableItem, setTableItem] = useState(item);
    //const [tableChildItem, setTableChildItem] = useState(item.children);
    const [variance, setVariance] = useState("0");
    const [val, setVal] = useState(0);
    //const [refTableData, setRefTableData] = useState(data.rows);

    const handlePercent = (index) => {
        setTableItem({
            ...tableItem,
            value: tableItem.value + (tableItem.value * parseInt(val)) / 100,
        });
        debugger;

        setVariance(
            (((tableItem.value - tableItem.intVal) / tableItem.intVal) * 100).toFixed(
                2
            )
        );
    };

    const handleAllocation = (index) => {
        setTableItem({ ...tableItem, value: val });
    };
    return (
        <>
            <tr key={tableItem.label}>
                <td>{tableItem.label}</td>
                <td>{tableItem.value}</td>
                <td>
                    <input
                        type="number"
                        onChange={(e) => setVal(e.target.value)}
                        value={val}
                    />
                </td>
                <td>
                    <input
                        // ref={item.label}
                        type="button"
                        value="Increase BY %"
                        onClick={(e) => handlePercent(index)}
                    />
                </td>
                <td>
                    <input
                        type="button"
                        value="Replace Value"
                        onClick={(e) => handleAllocation(index)}
                    />
                </td>
                <td>{variance} %</td>
            </tr>
            {item.children.length > 0 &&
                item.children.map((child, indx) => {
                    return (
                        <TableChildItem
                            parent={tableItem.label}
                            child={child}
                            index={indx}
                            setTableItem={setTableItem}
                            tableItem={tableItem}
                        />
                    );
                })}
        </>
    );
}

export default TableBody;