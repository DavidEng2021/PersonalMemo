import React from 'react'
import './AuthPage.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, * as others from 'axios';
import MemeFace from '../images/memeface.png';

const AuthPage = ({token, setToken}) => {

    const [login, setLogin] = useState('')
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        user:'',
        password:''
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('https://my-personal-memo.herokuapp.com/login',
        {
            user: userData.user,
            password: userData.password
        }).then((res)=>{
            if(res.data.message){
                setLogin(res.data.message);
            } else {
                setToken(res.data.jwttoken);
            }
        })
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
                onChange={(e)=>{ setUserData({...userData, password:e.target.value})} }/>
            </div>
            <button className='btn btn-primary'>送出</button>
        </form>
        <div>{ login===""? <h1>🕵</h1> : <h1><img className='memeface' src={MemeFace}/>不認識你!</h1> }</div>
    </div>
  )
}

export default AuthPage