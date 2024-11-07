import React, { useRef, useState } from 'react';
import './App.css';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import TableBody from './TableBody';
import { data } from './redux/data';

function App() {
  let table = {

    "rows": [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1400, //this value needs to be calculated from the children values (800+700)
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000, //this need to be calculated from the children values (300+700)
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 300
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 700
          }
        ]
      }
    ]
  }
  const elRef = useRef()
  const firstref = useRef()
  const [isValue, setIsValue] = useState()
  const [isChildren, setIsChildren] = useState(0)
  const [isParent, setIsParent] = useState([])

  const [inputValues, setInputValues] = useState(table.rows[0].children.map(() => ''));
  // const [inputValuess, setInputValuess] = useState(table.rows[0].children.map(() => ''));
  const handleInputChange = (index, value) => { const newInputValues = [...inputValues]; newInputValues[index] = value; setInputValues(newInputValues); };


  const AllocationPer = () => {
    let value = table.rows[0].children.reduce((a, b) => a.value + b.value
    )



    let Adding = value * isValue / 100
    setIsChildren(`${Adding}`)

  }

  const AllocationPer2 = () => {
    let value = table.rows[0].children.reduce((a, b) => a.value + b.value
    )
    let Adding = Number(value) + Number(isValue)
    setIsChildren(Adding)
  }

  // NEW TECH
  const count = useSelector((state) => state.counter)
  // const dispatch = useDispatch()
  // const [tableData, setTableData] = useState(data.rows);
  const refData = count.map((a) => {
    return { ...a, intVal: a.value };
  });
  // NEW TECH
  console.log('count=====', firstref.current);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Input</th>
              <th>Allocation %</th>
              <th>Allocation Val</th>
              <th>Variance %</th>
            </tr>
          </thead>
          <tbody >


            <tr>
              <td>
                {table.rows[0].label}
              </td>
              <td>{isChildren == NaN || isChildren == 0 ?


                table.rows[0].children.reduce((a, b) => {
                  return (

                    <td>
                      {isValue ? Number(a.value) + b.value + Number(isValue) : a.value + b.value}
                    </td>
                  )
                })

                : isChildren}</td>
              <td>
                <input type='number'
                  value={isValue}
                  onChange={(e) => {
                    setIsValue(e.target.value)
                  }}
                />
              </td>
              <td>
                <button onClick={() => AllocationPer()}>[button 1]</button>
              </td>
              <td>
                <button onClick={() => {
                  AllocationPer2()
                }}>[button 2]</button>
              </td>

              <td>
                {isChildren == NaN ? 0 : isChildren}

              </td>
            </tr>
            {table.rows[0].children.map((ele, i) => {
              const IsChildBtn = (i) => {
                let value = table.rows[0].children[i].value



                let Adding = value * inputValues[i] / 100
                setIsParent(`${Adding}%`)
                let parent = table.rows[0].children.reduce((a, b) => a.value + b.value)
                let ParentPer = parent * Number(inputValues.reduce((a, b) => Number(a) + Number(b))) / 100

                setIsChildren(`${ParentPer}`)
              }
              const IsChildBtn2 = (i) => {
                let value = table.rows[0].children[i].value
                let Adding = value + Number(inputValues[i])
                setIsParent(`${Adding}`)
                let parent = table.rows[0].children.reduce((a, b) => a.value + b.value)
                let ParentPer = parent + Number(inputValues.reduce((a, b) => Number(a) + Number(b)))

                setIsChildren(`${ParentPer}`)
              }
              return (
                <tr key={i}>

                  <td>
                    -- {ele?.label}

                  </td>
                  <td ref={firstref}>
                    {inputValues[i] ? ele?.value + Number(inputValues[i]) : ele?.value}
                  </td>
                  <td>
                    <input type='number' value={inputValues[i]} onChange={(e) => handleInputChange(i, e.target.value)} />
                  </td>
                  <td>
                    <button onClick={() => IsChildBtn(i)
                    }>[button 1]</button>
                  </td>
                  <td>
                    <button onClick={() => IsChildBtn2(i)}>[button 2]</button>
                  </td>

                  <td>
                    {isParent}
                  </td>
                </tr>
              )
            })}
            <tr>
              <td>
                {table.rows[1].label}
              </td>
              {table.rows[1].children.reduce((a, b) => {
                return (

                  <td>
                    {a.value + b.value}
                  </td>
                )
              })}
              <td>
                <input type='number' ref={elRef}

                />
              </td>
              <td>
                <button >[button 1]</button>
              </td>
              <td>
                <button>[button 2]</button>
              </td>

              <td>

              </td>
            </tr>
            {table.rows[1].children.map((ele, i) => {
              const handleroom = (e, id) => {


                if (i === id)
                  setIsValue(e.target.value);


              };
              return (
                <tr key={i}>

                  <td>
                    -- {ele?.label}

                  </td>
                  <td>
                    {ele?.value}
                  </td>
                  <td>
                    <input type='number' ref={elRef}

                    />
                  </td>
                  <td>
                    <button >[button 1]</button>
                  </td>
                  <td>
                    <button>[button 2]</button>
                  </td>

                  <td>

                  </td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>
      {/* NEW FILED Start */}
      {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Input</th>
              <th>Allocation %</th>
              <th>Allocation Val</th>
              <th>Variance %</th>
            </tr>
          </thead>
          <tbody >

            {refData.length > 0 &&
              refData.map((item, index) => {
                return <TableBody item={item} index={index} />;
              })}

          </tbody>
        </table>
      </div> */}
      {/* NEW FILED End */}
    </>

  )
}

export default App;
