import React, { useEffect } from "react";
import { useState } from "react";
import {Link,NavLink,useNavigate} from 'react-router-dom'

export default function Header(){
    const [emp,setEmp]=useState('')
    const navigate=useNavigate()
    const userType=localStorage.getItem('userType')

    useEffect(()=>{
        setEmp(localStorage.getItem('userType'))
    },[])

    function logout(e){
        e.preventDefault()
    
        localStorage.clear()
        navigate('/login')
      }

    return(
        <header className="sticky top-0 w-full z-1000 left-0 bg-orange-500 ">
            <div className="text-white text-3xl p-5 text-center">
                DashBoard
            </div>
            <div className="flex justify-between p-3 text-white">
                <div>
                    {emp.toUpperCase()}
                </div>

                <div>
                    <ul className="flex">
                        <li>
                            <NavLink to="/" className="p-2 hover:bg-gray-400">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tasks" className="p-2 hover:bg-gray-400">
                                Tasks
                            </NavLink>
                        </li>
                        {userType=='admin'?
                            (
                                <>
                                <li>
                                    <NavLink to="/teams" className="p-2 hover:bg-gray-400">
                                        Teams
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/report" className="p-2 hover:bg-gray-400">
                                        Report
                                    </NavLink>
                                </li>
                                </>                                
                            ): null
                        }
                        
                    </ul>
                </div>

                <div>
                    {/* <Link to='#' className="hover:bg-gray-400 p-2">
                        Profile
                    </Link> */}

                    <Link to='/login' onClick={(e)=> logout(e)} className="hover:bg-gray-400 p-2">
                        Logout
                    </Link>
                </div>                
            </div>
        </header>
    )
}