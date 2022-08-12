import React from 'react'
import { useEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ThoughtTable from '../tables/ThoughtTable'
import ThoughtFilter from '../forms/ThoughtFilter'
import './ThoughtPage.css'
import ThoughtModal from '../modals/ThoughtModal'

const ThoughtPage = ({token}) => {

  const navigate = useNavigate()

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
            <Outlet/>
          </div>
          <div className='btn-area'>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#thoughtModalCenter">
              寫東西
            </button>
            <button className='btn btn-primary'>刪除</button>
          </div>
      </div>
    </div>
    <ThoughtModal />
    </>
  )
}

export default ThoughtPage