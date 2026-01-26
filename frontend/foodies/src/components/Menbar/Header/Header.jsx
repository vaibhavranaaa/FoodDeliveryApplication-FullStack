import React from 'react'
import { Link } from 'react-router-dom'
import bg from "../../../assets/foodbg.jpg";
import './Header.css'                 

const Header = () => {
  return (
    <div
      className="p-5 mb-4 rounded-3 mt-1 header"
      style={{ backgroundImage: `url(${bg})` }}   
    >
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold text-white">
          Order your favorite food here
        </h1>
        <p className="col-md-8 fs-4 text-white">
          Discover the best food and drinks in Faridabad
        </p>
        <Link to="/explore" className="btn btn-primary">
          Explore
        </Link>
      </div>
    </div>
  )
}

export default Header
