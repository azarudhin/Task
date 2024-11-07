import React, { useState, useEffect, useRef } from "react";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      children: [
        { id: "phones", label: "Phones", value: 800 },
        { id: "laptops", label: "Laptops", value: 700 },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      children: [
        { id: "tables", label: "Tables", value: 300 },
        { id: "chairs", label: "Chairs", value: 700 },
      ],
    },
  ],
};

const calculateValueFromChildren = (row) => {
  if (row.children) {
    row.value = row.children.reduce((sum, child) => sum + calculateValueFromChildren(child), 0);
  }
  return row.value;
};

initialData.rows.forEach((row) => calculateValueFromChildren(row));

function Row({ row, updateValue, distributeToChildren }) {
  const [input, setInput] = useState("");
  const originalValue = useRef(row.value);
  const [variance, setVariance] = useState(0);

  useEffect(() => {
    setVariance(((row.value - originalValue.current) / originalValue.current) * 100);
  }, [row.value]);

  const handlePercentageIncrease = () => {
    const percentage = parseFloat(input);
    if (!isNaN(percentage)) {
      const newValue = row.value + (row.value * percentage) / 100;
      updateValue(row.id, newValue);
    }
  };

  const handleDirectValueSet = () => {
    const newValue = parseFloat(input);
    if (!isNaN(newValue)) {
      const newValues = (row.value + newValue);
      if (row.children) {
        distributeToChildren(row.id, newValues);
      } else {
        updateValue(row.id, newValues);
      }
    }
  };

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value.toFixed(0)}</td>
        <td>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter % or Value"
          />
        </td>
        <td>   <button onClick={handlePercentageIncrease}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleDirectValueSet}>Allocation Val</button>

        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {row.children && row.children.map((child) => (
        <Row key={child.id} row={child} updateValue={updateValue} distributeToChildren={distributeToChildren} />
      ))}
    </>
  );
}

function App() {
  const [data, setData] = useState(initialData);

  const updateValue = (id, newValue) => {
    const updateRowValues = (rows) =>
      rows.map((row) => {
        if (row.id === id) {
          row.value = newValue;
        }
        if (row.children) {
          row.children = updateRowValues(row.children);
          row.value = row.children.reduce((acc, child) => acc + child.value, 0);
        }
        return row;
      });

    setData((prevData) => ({
      ...prevData,
      rows: updateRowValues(prevData.rows),
    }));
  };

  const distributeToChildren = (id, newTotal) => {
    const distributeValues = (rows) =>
      rows.map((row) => {
        if (row.id === id && row.children) {
          const currentTotal = row.children.reduce((sum, child) => sum + child.value, 0);
          row.children = row.children.map((child) => ({
            ...child,
            value: (child.value / currentTotal) * newTotal,
          }));
          row.value = newTotal;
        }
        if (row.children) {
          row.children = distributeValues(row.children);
        }
        return row;
      });

    setData((prevData) => ({
      ...prevData,
      rows: distributeValues(prevData.rows),
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Button</th>
            <th>Button</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <Row key={row.id} row={row} updateValue={updateValue} distributeToChildren={distributeToChildren} />
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
