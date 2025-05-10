import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'
import {Provider} from 'react-redux'
import appStore from './utils/appStore'
import Profile from './components/Profile'

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
          path:"profile",
          element:<Profile/>

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
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
      
    </div>
  )
}

export default App