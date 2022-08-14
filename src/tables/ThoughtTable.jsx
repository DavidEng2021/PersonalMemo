import {React, useEffect, useMemo, useState} from 'react'
import { useTable, useSortBy } from 'react-table'
import { useNavigate, useOutletContext } from 'react-router-dom'
import axios, * as others from 'axios';
import './ThoughtTable.css'

function ThoughtTable() {

  const [pageflesh, dataFromFilter] = useOutletContext();

  const [postdata, setPostdata] = useState([]);

  useEffect(()=>{
      axios.get('http://localhost:3001/post').then(
        (res)=>{setPostdata(res.data)}
  ).catch(err =>{
    console.log(err)
  })},[pageflesh])//react第一次mounted會觸發

  useEffect(()=>{
    setPostdata(dataFromFilter)
  },[dataFromFilter]);//篩選頁面點擊btn>thoughtPage>table
  
  const navigate = useNavigate()

    const readPost =(e)=>{
      navigate(`post/${e.currentTarget.id}`)
    }
  
    const COLUMNS = [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: '日期',
          accessor: 'date',
        },
        {
          Header: '類型',
          accessor: 'type',
        },
        {
          Header: '內文預覽',
          accessor: 'content',
          Cell: ({ cell: { value } }) => { return (value.slice(0,27)+' ...')}
        },
        {
          Header: '情緒',
          accessor: 'mood',
        },
      ]
  
  
    const columns = useMemo(
      () => COLUMNS,[]
    )
  
    const data = postdata;

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    },useSortBy)
  
    // Render the UI for your table
    return (
      <table {...getTableProps()} className='thought-table table table-striped table-hover table-bordered'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className='thought-table-row'>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="Thought-tr" id={row.values.id} onClick={readPost}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

export default ThoughtTable