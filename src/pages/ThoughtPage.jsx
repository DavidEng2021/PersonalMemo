import React, { useState } from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ThoughtFilter from '../forms/ThoughtFilter'
import './ThoughtPage.css'
import ThoughtModal from '../modals/ThoughtModal'

const ThoughtPage = ({token}) => {
  //modal中發文後更新頁面用 將set給modal page給outlet中的table
  const [pageflesh, setPageflesh] = useState(false);
  

  const navigate = useNavigate()
  //驗證用
  useEffect(()=>{
    if(!token){navigate('/')}
  },[])

  return (
    <>
    <div className='thought__container'>
      <div className='thought__container__left-area'>
          <div className='filter'>
            <ThoughtFilter />
          </div>
      </div>
      <div className="thoutht__container__right-area">
          <div className='table'>
            <Outlet context={pageflesh}/>
          </div>
          <div className='btn-area'>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#thoughtModalCenter">
              寫東西
            </button>
          </div>
      </div>
    </div>
    <ThoughtModal setPageflesh={setPageflesh} pageflesh={pageflesh}/>
    </>
  )
}

export default ThoughtPage