import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BuyingPage = ({token}) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){navigate('/')}
  },[])

  return (
    <div>BuyingPage</div>
  )
}

export default BuyingPage