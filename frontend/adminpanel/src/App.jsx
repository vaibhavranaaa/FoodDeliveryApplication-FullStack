import { Route, Routes } from "react-router-dom"
import AddFood from "./pages/AddFood/AddFood"
import ListFood from "./pages/ListFood/ListFood"
import Orders from "./pages/Orders/Orders"
import SideBar from "./components/SideBar/SideBar"
import Menubar from "./components/MenuBar/Menubar"
import { useState } from "react"
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [sidebarVisible,setSidebarVisible]=useState(true);

  const toggleSideBar = () =>{
    setSidebarVisible(!sidebarVisible);
  }
  return (
    <div className="d-flex" id="wrapper">
            
            <SideBar sidebarVisible={sidebarVisible}/>
            
            <div id="page-content-wrapper">

              <Menubar toggleSideBar={toggleSideBar}/>
              <ToastContainer/>
             
                
              
                <div className="container-fluid">
                    <Routes>
                      <Route path='/add' element={<AddFood/>}/>
                      <Route path='/list' element={<ListFood/>}/>
                      <Route path='/orders' element={<Orders/>}/>
                      <Route path='/' element={<ListFood/>}/>



                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App
