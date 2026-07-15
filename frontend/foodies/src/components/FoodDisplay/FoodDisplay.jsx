import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../Fooditem/FoodItem";

const FoodDisplay = ({category,searchText}) => {



  const { foodList } = useContext(StoreContext);

console.log("foodList =", foodList);
console.log("isArray =", Array.isArray(foodList));

const filteredFoods = Array.isArray(foodList)
  ? foodList.filter(food => (
      (category === 'All' || food.category === category) &&
      food.name.toLowerCase().includes(searchText.toLowerCase())
    ))
  : [];

  return (
    <div className="container">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem 
              key={food.id}            
              id={food.id}                      
              name={food.name}
              description={food.description}
              price={food.price}
              imageUrl={food.imageUrl}             
            />
          ))
        ) : (
          <div className="text-center mt-4">
            <h4>No food found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
