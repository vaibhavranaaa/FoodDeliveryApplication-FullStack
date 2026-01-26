import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ListFood.css";

const API_URL = "http://localhost:8080/api/foods";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(API_URL);
      setList(response.data); // ✅ array directly
    } catch (error) {
      console.error(error);
      toast.error("Error while reading the foods.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      await axios.delete(`${API_URL}/${foodId}`); // ✅ DELETE
      toast.success("Food removed.");
      fetchList();
    } catch (error) {
      toast.error("Error occurred while removing the food.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card p-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    height={48}
                    width={48}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}.00</td>
                <td className="text-danger">
                  <i
                    className="bi bi-x-circle-fill"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;
