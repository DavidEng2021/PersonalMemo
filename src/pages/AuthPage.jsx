import React from 'react'
import './AuthPage.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthPage = ({token, setToken}) => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        user:'',
        passward:''
    });

    const handleSubmit = async (e) =>{
        e.preventDefault()
        //pass userData to server and checking exist from DB, then DB will sent JWT token back.
        setToken(true)
    }

    useEffect(()=>{
        if(token){
            navigate('/thought');
        }
    },[token])

  return (
    <div className='auth-container'>
        <form className='auth-container__form' onSubmit={handleSubmit}>
            <div className='input-1'>
                <label >你是誰?</label>
                <input type="text"
                onChange={(e)=>{ setUserData({...userData, user:e.target.value})} } />
            </div>
            <div className='input-2'>
                <label >密碼?</label>
                <input type="password"
                onChange={(e)=>{ setUserData({...userData, passward:e.target.value})} }/>
            </div>
            <button className='btn btn-primary'>送出</button>
        </form>
    </div>
  )
}

export default AuthPage