import React, { useState, useEffect } from "react";
import "../CSS/cart.css";
import { Link } from "react-router-dom";
import Footer from "../Components/footer";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
    setTotalProducts(cartData.length);
    setTotalPrice(cartData.reduce((acc, item) => acc + Number(item.price), 0));
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setTotalProducts(updatedCart.length);
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
  };

  const handleQuantityChange = (id, operation) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (operation === "add" && item.quantity < 10) {
          item.quantity++;
        } else if (operation === "subtract" && item.quantity > 1) {
          item.quantity--;
        }
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setTotalProducts(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(
      updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  return (
    <>
    <h2>Shopping Bag</h2>
    <div className="cart-page">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-price">₹{item.price}</div>
              <div className="item-quantity">
                <button
                  onClick={() => handleQuantityChange(item.id, "subtract")}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, "add")}>
                  +
                </button>
              </div>
              <div
                className="item-remove"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total Products: {totalProducts}</h3>
        <h3>Total Price: ${totalPrice}</h3>
        <Link to="/checkout">
          <button className="checkout-btn">Checkout</button>
        </Link>
      </div>
    </div><br /><br />
    <Footer/>
    
    </>
  );
};
export default Cart;