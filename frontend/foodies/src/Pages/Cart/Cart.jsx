import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { calculateCartTotals } from "../../util/cartUtils";


const Cart = () => {
  const navigate=useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities = {} } =
    useContext(StoreContext);

  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  const{subtotal,shipping,tax,total}=calculateCartTotals(
    cartItems,
    quantities
  );
  

  

  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>

      <div className="row">
        {/* CART ITEMS */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">

              {/* EMPTY CART */}
              {cartItems.length === 0 && (
                <div className="text-center py-4">
                  <h5 className="mb-3">Cart is empty</h5>
                </div>
              )}

              {/* CART LIST */}
              {cartItems.map(food => (
                <div key={food.id}>
                  <div className="row cart-item mb-3">
                    <div className="col-md-3">
                    <img
  src={`http://localhost:8080/uploads/${food.imageUrl}`}
  alt={food.name}
  className="img-fluid rounded"
  style={{
    width: "120px",
    height: "120px",
    objectFit: "cover"
  }}
/>
                    </div>

                    <div className="col-md-5">
                      <h5 className="card-title">{food.name}</h5>
                      <p className="text-muted">Category: {food.category}</p>
                    </div>

                    <div className="col-md-2">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQty(food.id)}
                        >
                          -
                        </button>

                        <input
                          style={{ maxWidth: "100px" }}
                          type="text"
                          className="form-control form-control-sm text-center"
                          value={quantities[food.id]}
                          readOnly
                        />

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQty(food.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-md-2 text-end">
                      <p className="fw-bold">₹{food.price * quantities[food.id]}</p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => decreaseQty(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}

              {/* Continue Shopping button - BELOW cart items */}
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={cartItems.length === 0} onClick={()=>navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
