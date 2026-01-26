export const calculateCartTotals=(cartItems,quantities)=>{
    const subtotal = cartItems.reduce(
        (acc, food) => acc + food.price * quantities[food.id],
        0
      );
    
      const shipping = cartItems.length > 0 ? 20 : 0; 
      const tax = subtotal * 0.05;
      const total = subtotal + shipping + tax;

      return {subtotal,shipping,tax,total};


}