import React, { useReducer } from "react";
import "./products.css";
import { v4 as uuid } from "uuid";

const products = [
  { img: "📱", name: "iphone", price: 1000, id: uuid() },
  { img: "💻", name: "macbook", price: 2200, id: uuid() },
  { img: "🎧", name: "airpods", price: 550, id: uuid() },
];

const getTotal = (cart) => {
  const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const cartReducer = (state, { type, item }) => {
  switch (type) {
    case "ADD":
      return [...state, item];
    case "DELETE":
      const idx = state.findIndex((el) => el.name === item.name);
      if (idx < 0) {
        return state;
      }
      const stateCopy = [...state];
      stateCopy.splice(idx, 1);
      return stateCopy;
    default:
      return state;
  }
};

export const Products = () => {
  const [cart, setCart] = useReducer(cartReducer, []);

  const add = (item) => {
    setCart({ item, type: "ADD" });
  };

  const remove = (item) => {
    setCart({ item, type: "DELETE" });
  };

  return (
    <div className="container">
      <div>Total Items: {cart.length}</div>
      <div>Total Cost: {getTotal(cart)}$</div>
      <div className="products">
        {products.map((item) => (
          <div key={item.id}>
            <div className="product">
              <span role={item.img} aria-label={item.name}>
                {item.img}
              </span>
            </div>
            <button onClick={() => add(item)}>ADD</button>
            <button onClick={() => remove(item)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};
