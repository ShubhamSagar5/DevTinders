import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
 
 
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Body/>,
      children:[
        {
          path:"/",
          element:<Feed/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        }
      ]
    }
  ])

 
 
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App