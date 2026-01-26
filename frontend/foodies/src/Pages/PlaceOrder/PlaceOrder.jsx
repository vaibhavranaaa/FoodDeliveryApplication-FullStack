import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import axios from "axios";
import { RAZORPAY_KEY_ID } from "../../util/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `
        ${data.firstName} ${data.lastName}
        ${data.address}
        ${data.state} ${data.city}
        ${data.zip}
      `,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: Number(total.toFixed(2)),
      orderStatus: "Preparing",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data.razorpayOrderId) {
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      console.error("ORDER ERROR:", error);
      console.error("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
        "Unable to place order. Please try again."
      );
    }
  }

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount * 100,
      currency: "INR",
      name: "Food Land",
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: async (response) => {
        await verifyPayment(response);
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: async () => {
          toast.error("Payment cancelled");
          await deleteOrder(order.id);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/verify",
        razorpayResponse,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Payment successful");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/");
      }
    } catch {
      toast.error("Payment failed. Please try again.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuantities({});
    } catch {
      toast.error("Error while clearing cart.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="text-center">
          <img src={logo} alt="App Logo" style={{ height: "80px", objectFit: "contain" }} />
        </div>

        <div className="col-md-7">
          <h4 className="mb-4">Billing address</h4>
          <form onSubmit={onSubmitHandler}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>

            <div className="mb-3">
              <label className="phone">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="9308403"
                required
                name="phoneNumber"
                onChange={onChangeHandler}
                value={data.phoneNumber}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ballabgarh"
                required
                name="address"
                onChange={onChangeHandler}
                value={data.address}
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-5">
                <label className="form-label">State</label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="state"
                  value={data.state}
                  onChange={onChangeHandler}
                >
                  <option>Choose...</option>
                  <option>Haryana</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">City</label>
                <select
                  className="form-select"
                  id="city"
                  required
                  name="city"
                  value={data.city}
                  onChange={onChangeHandler}
                >
                  <option>Choose...</option>
                  <option>Faridabad</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Zip</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="zip"
                  value={data.zip}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit" disabled={cartItems.length === 0}>
              Continue to checkout
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-primary">Your cart</h4>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </div>

          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li className="list-group-item d-flex justify-content-between" key={item.id}>
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">Qty:{quantities[item.id]}</small>
                </div>
                <span>&#8377;{item.price * quantities[item.id]}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <span>Shipping</span>
              </div>
              <span>{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <div>
                <span>Tax</span>
              </div>
              <span>&#8377;{tax.toFixed(2)}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Total(INR)</strong>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
