import React from 'react'
import { useState } from 'react'
import './ThoughtFilter.css'

const ThoughtFilter = () => {
    const [filterData, setFilterData] = useState({
        date:'',
        type:'隨筆',
        mood:'正面'
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        const filteredData = [];
        filterData.date && filteredData.push(filterData.date);
        filterData.type && filteredData.push(filterData.type);
        filterData.mood && filteredData.push(filterData.mood);
        console.log(filteredData)
    } 

  return (
    <div className='ThoughtFilter__container'>
        <div className="card">
            <form onSubmit={handleSubmit} className='card-body'>
                <div className='option1'>
                    <label>日期</label>
                    <input type="date" onChange={(e)=>{setFilterData({...filterData, date:e.target.value})}}/>
                </div>
                <div className="option2">
                    <label>類型</label>
                    <select onChange={(e)=>{setFilterData({...filterData, type:e.target.value})}}>
                        <option value="隨筆">隨筆</option>
                        <option value="詩">詩</option>
                        <option value="故事">故事</option>
                        <option value="加密">加密</option>
                    </select>
                </div>
                <div className="option3">
                    <label>情緒</label>
                    <select onChange={(e)=>{setFilterData({...filterData, mood:e.target.value})}}>
                        <option value="正">正面</option>
                        <option value="負">負面</option>    
                    </select>    
                </div>
                <button className='btn btn-primary'>
                    送出
                </button>
            </form>
        </div>
    </div>
  )
}

export default ThoughtFilter