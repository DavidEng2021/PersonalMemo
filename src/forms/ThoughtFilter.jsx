import React from 'react'
import { useState } from 'react'
import axios, * as others from 'axios';
import './ThoughtFilter.css'

const ThoughtFilter = ({setDataFromFilter}) => {
    const [filterData, setFilterData] = useState({
        date:'',
        type:'隨筆',
        mood:'正'
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.get("http://localhost:3001/filteredpost", {
            params:{
                date:filterData.date,
                type:filterData.type,
                mood:filterData.mood
            }
        }).then(
            (res)=>{setDataFromFilter(res.data)}
        ).catch(err =>{
          console.log(err)
        })
    };

    const clearOpts = (e) =>{
        e.preventDefault()
        setFilterData({
            date:'',
            type:'隨筆',
            mood:'正'
        })
    };

  return (
    <div className='ThoughtFilter__container'>
        <div className="card">
            <form onSubmit={handleSubmit} className='card-body'>
                <div className='option1'>
                    <label>日期</label>
                    <input type="date" value={filterData.date} onChange={(e)=>{setFilterData({...filterData, date:e.target.value})}}/>
                </div>
                <div className="option2">
                    <label>類型</label>
                    <select value={filterData.type} onChange={(e)=>{setFilterData({...filterData, type:e.target.value})}}>
                        <option value="隨筆">隨筆</option>
                        <option value="詩">詩</option>
                        <option value="故事">故事</option>
                        <option value="加密">加密</option>
                    </select>
                </div>
                <div className="option3">
                    <label>情緒</label>
                    <select value={filterData.mood} onChange={(e)=>{setFilterData({...filterData, mood:e.target.value})}}>
                        <option value="正">正面</option>
                        <option value="負">負面</option>    
                    </select>    
                </div>
                <button className='btn btn-primary'>
                    送出
                </button>
                <button className='btn btn-primary' onClick={clearOpts}>
                    清除選項
                </button>
            </form>
        </div>
    </div>
  )
}

export default ThoughtFilter