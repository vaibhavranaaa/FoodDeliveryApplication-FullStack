import React, { useContext } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
  const { quantities, token, setToken,setQuantities } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
    
  };

  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;
  const isActive = path => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">

        <Link to="/">
          <img src={assets.logo} alt="logo" height={48} width={48} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/") ? "fw-bold active" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/explore") ? "fw-bold active" : ""}`} to="/explore">
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/contact") ? "fw-bold active" : ""}`} to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">

            <Link to="/cart" className="position-relative text-dark">
              <img src={assets.cart} alt="cart" height={30} width={30} />
              {uniqueItemsInCart > 0 && (
                <span className="cart-badge">{uniqueItemsInCart}</span>
              )}
            </Link>

            {token && (
              <div className="dropdown">
                <button
                  className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-1"
                  data-bs-toggle="dropdown"
                >
                  <img src={assets.profile} alt="profile" height={40} width={40} style={{ borderRadius: "50%" }} />
                  <span style={{ fontSize: "12px" }}>▼</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={() => navigate("/myorders")}>
                      Orders
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {!token && (
              <>
                <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn btn-outline-success" onClick={() => navigate("/register")}>
                  Register
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
