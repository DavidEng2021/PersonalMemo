import React, { useState } from 'react'
import './ThoughtModal.css'
import axios, * as others from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThoughtModal = ({setPageflesh,pageflesh}) => {

    const Today = new Date()
    const fullDay = Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日"

    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const dataDay = yyyy + '-' + mm + '-' + dd;

    const [post, setPost] = useState(
        {
        'type':'隨筆',
        'mood':'正',
        'text':''
        }
    )

    const notify = () => toast("貼文成功!");

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post('https://my-personal-memo.herokuapp.com/create',
        {date:dataDay,
        type:post.type,
        content:post.text,
        mood:post.mood}).then(()=>{
            notify();
            setPost({
                'type':'隨筆',
                'mood':'正',
                'text':''
                });
            setPageflesh(!pageflesh);
        })
    };

    // const handleClose = () =>{
    //     setPageflesh(true);
    // }
   

  return (
    <>
    <div class="modal fade" id="thoughtModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">{fullDay}</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="thought-modal modal-body">
                    <form>
                        <div className="op1">
                            <label>類型</label>
                            <select onChange={(e)=>{setPost({...post, 'type':e.target.value})}}>
                                <option value="隨筆">隨筆</option>
                                <option value="詩">詩</option>
                                <option value="故事">故事</option>
                                <option value="加密">加密</option>
                            </select>
                        </div>
                        <div className="op2">
                            <label>情緒</label>
                            <select onChange={(e)=>{setPost({...post, 'mood':e.target.value})}}>
                                <option value="正">正面</option>
                                <option value="負">負面</option>    
                            </select>    
                        </div>
                        <div className='text-area'>
                            <label>內文</label>
                            <textarea cols="50" rows="10" value={post.text} onChange={(e)=>{setPost({...post, 'text':e.target.value})}}>
                            </textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" onClick={handleSubmit}>送出</button>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer
    position="top-center"
    autoClose={2000}
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

export default ThoughtModal