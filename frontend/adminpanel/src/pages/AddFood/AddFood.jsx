import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../assets/services/service";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Biryani",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    try {
      await addFood(data, image); 
      toast.success("Food added successfully!");

      setData({
        name: "",
        description: "",
        price: "",
        category: "Biryani",
      });
      setImage(null);
    } catch (error) {
      toast.error("Error adding food.");
      console.error(error);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="food"
                    width={100}
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  hidden
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Chicken Biryani"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Write description"
                  value={data.description}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="IceCream">IceCream</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="₹200"
                  value={data.price}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
