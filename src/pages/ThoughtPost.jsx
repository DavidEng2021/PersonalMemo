import {React, useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios, * as others from 'axios';
import './ThoughtPost.css'

const ThoughtPost = () => {

  const navigate = useNavigate()

   const {id} = useParams()
   //用id向後端得到post內容
   const [post, setPost] = useState({});

   
   useEffect(()=>{
     axios.post('http://localhost:3001/id',{
         id:id
     }).then(
       (res)=>{setPost(res.data[0])} //server回傳的res.data都包在arr裡面啊 我的媽
     ).catch(err =>{
       console.log(err)
     });
   },[])

   const notify = () => toast("刪除成功!");

    const deletePost = () =>{
      alert('確定要刪除?')
      axios.delete("http://localhost:3001/delete/"+id).then(
        ()=>{
          notify();
          navigate('/thought');
        }
      );
    }

  return (
    <>
    <div className='post-container'>
        <div className='post-container__content'>
            <h4>ID:{id} 日期:{post.date}</h4>
            <div className='post-tags'>
                <div className='post-tag'>{post.type}</div>
                <div className='post-tag'>{post.mood}</div>
            </div>
            <div className='post-content'><pre>{post.content}</pre></div>
            <div className='post-btns'>
              <Link to='/thought'>←返回列表</Link>
              <button className='btn btn-outline-secondary' onClick={deletePost}>刪除</button>
            </div>
        </div>
    </div>
    <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    </>
  )
}

export default ThoughtPost