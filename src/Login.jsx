import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from './components/Loader/Loader'
import Modal from 'react-modal'

Modal.setAppElement('#root');

function Login() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()
    const [isOpen,setOpen]=useState(true)

    function closeModal(){
        setOpen(false);
    }

    function submitFunc(e){
        e.preventDefault()

        const obj={
            username:username,
            password:password
        }

        setLoading(true);
        axios.post('https://emp-system-gt0d.onrender.com/api/users/login',obj)
            .then((response)=>{
                console.log(response)
                localStorage.setItem('userType',response.data.usertype)
                localStorage.setItem('userToken',response.data.token)
                setLoading(false)
                navigate('/',{state:{user:response.data}})
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
    }

  return (
        <div className='flex justify-center items-center h-screen'>
            {isOpen?(
                <Modal isOpen={isOpen} onRequestClose={closeModal} 
                    overlayClassName={'fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center items-center'}
                    className={'bg-white  w-1/4 shadow-2xl'}>
                    <div className='flex justify-between bg-slate-950'>
                        <p className='flex items-center justify-center pl-3 pt-0 pb-0 text-gray-100'>Information Alert</p>
                        <button className='text-white text-2xl bg-transparent border-none pr-3 pt-0 pb-0' onClick={closeModal}>&times;</button>
                    </div>
                    <div className='text-gray-300 bg-slate-700 pb-3 pt-3'>
                        <div className='p-2'>
                            <h3 className='text-center text-xl text-'>Credentials for test use</h3>
                        </div>
                        <div className='p-3'>
                            <p className='p-1'>Username : "user2"</p>
                            <p className='p-1'>Password : "u2_pwd"</p>
                        </div>
                    </div>
                </Modal>)
            :null}

            {loading ? (<Loader className='items-center'/>) 
                :(<div className='border-2 p-10 rounded-lg'>

                    <div className='p-3 text-center text-5xl'>
                        <p>Login Page</p>
                    </div>
                    <br/>

                    <form className='p-3'>
                        
                        <div className='p-2'>
                            Username<br/>
                            <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} className='border-2'></input>
                        </div>

                        <div className='p-2'>
                            Password<br/>
                            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='border-2'></input>
                        </div>

                        <div className='p-2 flex justify-center'>
                            <button onClick={(e)=>submitFunc(e)} className='border-1 bg-blue-600 text-white hover:bg-blue-400 p-2 w-1/2'>Login</button>
                        </div>
                    </form>
                </div>)}

        </div>       
  )
}

export default Login