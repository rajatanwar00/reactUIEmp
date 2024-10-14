import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import Login from './Login.jsx'
import Home from './components/Home/Home.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
        <Route path='tasks' element={<Tasks/>}/>
      </Route>

      <Route path='/login' element={<Login/>}/>
    </Route>     
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
