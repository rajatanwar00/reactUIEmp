import React, { useEffect, useState } from 'react'
import axios from 'axios'
import userImage from '../../assets/userImage.jpg'

function Home() {
    const userType=localStorage.getItem('userType')
    const token=localStorage.getItem('userToken')
    const [username,setUsername]=useState('')
    const [useremail,setUseremail]=useState('')
    const [usernumber,setUsernumber]=useState('')

    useEffect(()=>{
        axios.get('https://emp-system-gt0d.onrender.com/api/users/find',{headers:{token:token}})
        .then((response)=>{
            console.log(response)
            setUsername(response.data.username)
            setUseremail(response.data.email)
            setUsernumber(response.data.phonenumber)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div className='flex flex-grow min-h-screen w-full'>
        <div className='w-1/4 border-r-2 bg-gray-300 p-3'> 
            <p className='text-center text-lg'>
                Upcoming Deadlines
            </p>
            <br></br><br></br>
            <p className='italic'>
                *This section is under development
            </p>
        </div>
        <div className='w-2/4 p-3'>
            Greetings,

            {userType=='admin'?(
                <>
                    <p>
                        Follow the Teams Section to perform operations on teams
                    </p>

                    <p>
                        Report section to create reports for teams
                    </p>
                </>
            ): null}
        </div>
        <div className='w-1/4 bg-gray-300 p-3 border-black border-l-2'>
            <div className=''>
                <img src={userImage} alt={'User Image here'}></img>
            </div>
            <div className='p-2 flex justify-center text-xl'>
                <div className='p-2'>
                    <label>Username: </label> <label>{username}</label><br></br>
                    <label>Usertype: </label> <label>{userType}</label><br></br>
                    <label>Useremail: </label> <label>{useremail}</label><br></br>
                    <label>User phone-number: </label> <label>{usernumber}</label>
                </div>                
            </div>
        </div>
    </div>
  )
}

export default Home