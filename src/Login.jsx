import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from './components/Loader/Loader'

function Login() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()

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
        {loading ? <Loader className='items-center'/> : 
        <div className='border-2 p-10 rounded-lg'>

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
        </div>}
    </div>
  )
}

export default Login