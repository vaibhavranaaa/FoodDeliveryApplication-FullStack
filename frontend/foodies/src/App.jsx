import Menubar from "./components/Menbar/Menubar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ContactUs from "./Pages/Contact/Contact";
import Explore from "./Pages/Explore/Explore";
import FoodDetails from "./Pages/FoodDetails/FoodDetails";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { ToastContainer } from 'react-toastify';
import MyOrders from "./Pages/MyOrders/MyOrders";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";



const App = () => {
  const {token}=useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer/>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/food/:id' element={<FoodDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={token ? <PlaceOrder/> : <Login/>}/>
        <Route path='/register' element={token ? <Home/> : <Register/>}/>
        <Route path='/login' element={token ? <Home/> :<Login/>}/>
        <Route path='/myorders' element={token ? <MyOrders/> : <Login/>}/>


        



      </Routes>
    </div>
  )
}

export default App;