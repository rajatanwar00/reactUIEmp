import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Loader from './../Loader/Loader'

export default function Tasks() {
  const [tasksArray,setTasksArray]= useState([])
  const [task,setTask]= useState("")
  const [taskStatus,setTaskStatus]= useState("")
  const [team,setTeam]= useState("")
  const [teamArray,setTeamArray]=useState([])
  const [cid,setCid]=useState("")
  const [ced,setCed]=useState("")
  const [uid,setUid]=useState("")
  const [ued,setUed]=useState("")
  const [pgno,setPgno]=useState(1)
  const backendUrl='https://emp-system-gt0d.onrender.com'
  const token=localStorage.getItem('userToken')
  const userType=localStorage.getItem('userType')
  const [totalPages,setTotalPages]= useState(0)
  const [loading,setLoading]=useState(false)

    
  // To fetch tasks
  useEffect(()=>{

    //filterTasks(e)

    const paramsObj={
      task:task,
      status:taskStatus,
      teamname:team,
      cid:cid,
      ced:ced,
      uid:uid,
      ued:ued,
      limit:3,
      pageno:pgno,
      userType:userType
    }

    setLoading(true)
    axios.get(`${backendUrl}/api/tasks`,{headers:{token:`${token}`},params:paramsObj})
      .then((response)=>{
        console.log("Tasks Request")
        console.log(response)
        setLoading(false)
        setTasksArray(response.data.taskslist)
        setTotalPages(Math.ceil((response.data.totalRecords)/paramsObj.limit))
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })

  },[])

  // To fetch teams 
  useEffect(()=>{
    axios.get(`${backendUrl}/api/teams`,{headers:{token:token}})
      .then((response)=>{
        console.log("Teams Request")
        console.log(response)
        if(userType=='admin')
          setTeamArray(response.data)
        else{
          const obj=response.data
          setTeamArray([obj])
        }         
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  console.log({taskStatus,team,totalPages})


  function resetFilter(e){
    e.preventDefault();
    setTask('')
    setTaskStatus('')
    setCid('')
    setCed('')
    setUid('')
    setUed('')
  }


  function filterTasks(e){
    if(e)
    e.preventDefault();

    const paramsObj={
      task:task,
      status:taskStatus,
      teamname:team,
      cid:cid,
      ced:ced,
      uid:uid,
      ued:ued,
      limit:3,
      pageno:pgno,
      userType:userType
    }

    setLoading(true)
    axios.get(`${backendUrl}/api/tasks`,{headers:{token:token},params:paramsObj})
    .then((response)=>{
      setLoading(false)
      setTasksArray(response.data.taskslist)
      setTotalPages(Math.ceil((response.data.totalRecords)/paramsObj.limit))
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }

  function newPage(pagenumber){
    //e.preventDefault();
    setPgno(pagenumber)

    filterTasks();
  }

  return (
    <div className="flex flex-grow min-h-screen w-full">
      
        <div className=' border-r-2 w-1/4 bg-gray-300 '>
            <form className='p-2 flex flex-col gap-y-4'>
              <div className='w-full p-1'>
                <p className='text-center text-lg'>Apply Filter</p>
              </div>
              
              <div className='w-full p-1 border-2'>
                <input type='text' value={task} onChange={(e)=> setTask(e.target.value)} placeholder=' Task' className='w-full p-2'></input>
              </div>

              <div className='w-full p-1 border-2'>
                <select value={taskStatus} onChange={(e)=> setTaskStatus(e.target.value)} className='w-full p-2'>
                  <option value="" disabled >Select a task status</option>
                  <option value="Pending">Pending</option>
                  <option value="Done">Done</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className='w-full p-1 border-2'>
                <select value={team} onChange={(e)=> setTeam(e.target.value)} className='w-full p-2'>
                <option value="" disabled >Select a team name</option>
                  {teamArray.map((team)=>(
                    <option value={team.name}>{team.name}</option>
                  ))}
                </select>
              </div>

              <div className='w-full p-1 border-2'>
                <p className='p-1'>Select Task assigned date range</p>
                <input type="date" value={cid} onChange={(e)=> setCid(e.target.value)} className='p-2'/>-<input type="date" value={ced} onChange={(e)=> setCed(e.target.value)} className='p-2'/>
              </div>

              <div className='w-full p-1 border-2'>
                <p className='p-1'>Select Task updated date range</p>
                <input type="date" value={uid} onChange={(e)=> setUid(e.target.value)} className='p-2'/>-<input type="date" value={ued} onChange={(e)=> setUed(e.target.value)} className='p-2'/>
              </div>

              <div className='w-full p-1 border-2'>
                <button type="submit" onClick={(e)=> filterTasks(e)} className='bg-blue-500 text-white w-full p-2 hover:bg-blue-400'>Filter</button>
              </div>

              <div className='w-full p-1 border-2'>
                <button onClick={(e)=> resetFilter(e)} className='bg-red-500 text-white w-full p-2 hover:bg-red-400 '>Reset</button>
              </div>
              
            </form>

        </div>

        <div className='flex-grow  '>
            <div className='h-1/4'>
              <p className='text-xl p-2'>You will find tasks assigned to teams here, try out the filter section on the  left</p>
            </div>
            <div className={`flex ${loading?'justify-center items-start p-0':'justify-center items-center'}`}>
              {loading?<Loader className='h-20 bg-orange-300' />:
              <div className='p-2 flex-grow place-items-center'>
                <TasksTable tasksArray={tasksArray} loading={loading}/>
                <PgnBtn count={totalPages} currentPage={pgno} newPage={newPage} filterTasks={filterTasks}/>
              </div>}
              
            </div>
            
        </div>
    </div>
  )
}

// Button Component
function PgnBtn({count,currentPage,newPage,filterTasks}){
  console.log("count",count)
  const elements=[]

  for(let i=0;i<count;i++){
    elements.push(
      <button key={i} className={`p-2 ${currentPage==i+1?'bg-blue-500 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=> newPage(i+1)} >{i+1}</button>
    )
  }

  return (<div className='flex p-2 items-end'>{elements}</div>)
}


// Tasks Table Component
function TasksTable({tasksArray,loading}){

  return(
    <table>
      <thead>
        <tr className='border-b-4 border-t-4'>
          <th>Task</th>
          <th>Team</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Date Updated</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasksArray.map((task)=>(
          <tr className='odd:bg-gray-100 even:bg-white'>
            <td>{task.task}</td>
            <td>{task.assignedToId.name}</td>
            <td>{task.status}</td>
            <td>{new Date(task.createdAt).toISOString().slice(0,10)}</td>
            <td>{new Date(task.updatedAt).toISOString().slice(0,10)}</td>
            <td>
              <select value={task.status} className='bg-blue-500 text-white p-1 rounded-md'>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}