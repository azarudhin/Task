import React, { useState } from "react";
import { data } from "./redux/data";

function TableChildItem({ child, parent, index }) {
    const [variance, setVariance] = useState("0");
    const [val, setVal] = useState(0);
    const [tableItem, setTableItem] = useState(child);
    const [refTableData, setRefTableData] = useState(data.rows);

    const handlePercent = (index) => {

        setTableItem({
            ...tableItem,
            value: tableItem.value + (tableItem.value * parseInt(val)) / 100,
        });
    };

    const handleAllocation = (index) => {
        //debugger;
        setTableItem({ ...tableItem, value: val });
    };

    return (
        <tr key={tableItem.label}>
            <td>--{tableItem.label}</td>
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
    );
}

export default TableChildItem;