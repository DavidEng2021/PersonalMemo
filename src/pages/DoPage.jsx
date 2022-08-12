import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DoPage = ({token}) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){navigate('/')}
  },[])

  return (
    <div>DoPage</div>
  )
}

export default DoPage