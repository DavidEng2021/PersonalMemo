import {React, useEffect, useMemo, useState} from 'react'
import { useTable, useSortBy } from 'react-table'
import { useNavigate, useOutletContext } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";
import axios, * as others from 'axios';
import './ThoughtTable.css'

function ThoughtTable(token) {
  const stringtoken = token.token;

  const [pageflesh, dataFromFilter] = useOutletContext();

  const [postdata, setPostdata] = useState([]);

  useEffect(()=>{
      axios.get('http://localhost:3001/post',{
        headers:{
          "access-token": stringtoken
        }
      }).then(
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

    const moodtable = (e) =>{
      if(e && e.stopPropagation) e.stopPropagation();

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const currentMonth = yyyy + '-' + mm;

      const monthPost = postdata.filter((data)=>{
        return data.date.slice(0, 7) === currentMonth;
      })
      const goodmood = monthPost.filter((data)=>{
        return data.mood === "正";
      }).length
      const badmood = monthPost.filter((data)=>{
        return data.mood === "負";
      }).length
      const monthlyMood = goodmood - badmood;
      if(monthlyMood>=20){
        alert("本月情緒:😁super good!")
      } else if (monthlyMood>=10){
        alert("本月情緒:😃nice!") 
      } else if(monthlyMood>=0){
        alert("本月情緒:🙂ok!")
      } else {alert("本月情緒:😤not ok!")}
    };
  
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
          Header: <button className='mood-btn' onClick={moodtable}>情緒</button>,
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
        {postdata.length < 1 ? <div className='loader'><BeatLoader loading={true} size={30}/></div>:
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
        </tbody>}
      </table>
    )
  }

export default ThoughtTable