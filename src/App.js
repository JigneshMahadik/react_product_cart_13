// import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {

  const [products, setProducts] = useState([
    { 
      id:1,
      name : "Product-1",
      price : 100,
      quantity : 0
    },
    { 
      id:2,
      name : "Product-2",
      price : 200,
      quantity : 0
    },
    { 
      id:3,
      name : "Product-3",
      price : 250,
      quantity : 0
    }
  ]);
  
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // function handleAdd(product_id){
  //   const tempList = products;
  //   tempList.filter((pro)=>{
  //     if(pro.id === product_id){
  //       return pro.quantity += 1;
  //     }
  //   });
  //   setProducts([...tempList]);
    
  //   // Check if the product is already in the cart
  //   const cartProduct = cart.find(item => item.id === product_id);
  //   if(cartProduct){
  //      // If the product is already in the cart, update its quantity
  //     // const cartProduct = cart.find(item => item.id === product_id);
  //     const updateCart = cart.filter((item)=>{
  //       if(item.id === product_id){
  //         item.quantity += 1;
  //       }
  //       return item;
  //     })
  //     setCart([...updateCart]);
  //     const totalCount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //     setTotal(totalCount);
  //     return updateCart;
  //   }
  //   else{
  //     // If the product is not in the cart then add it
  //     const productToAdd = products.find(product => product.id === product_id);
  //     setCart([...cart, { ...productToAdd, quantity: 1 }]);
  //     const totalCount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //     setTotal(totalCount);
  //     return productToAdd;
  //   }

  //   // Total count
  //   // const total = 0;
  //   // const totalCount = cart.filter(item => total += item.price * item.quantity);
  //   // console.log(totalCount);
  //    // Calculate total price
  // }

  // function handleRemove(product_id){
  //   // const tempList = products;
  //   // tempList.filter((pro)=>{
  //   //   if(pro.id === product_id){
  //   //     if(pro.quantity > 0){
  //   //       return pro.quantity -= 1;
  //   //     }
  //   //   }
  //   // });
  //   // setProducts([...tempList]);
  //   // Check if the product is already in the cart
  //   const cartProduct = cart.find(item => item.id === product_id);
  //   if(cartProduct){
  //      // If the product is already in the cart, update its quantity
  //     // const cartProduct = cart.find(item => item.id === product_id);
  //     const updateCart = cart.filter((item)=>{
  //       if(item.id === product_id){
  //         if(item.quantity > 0){
  //           item.quantity -= 1;
  //         }
  //       }
  //       return item;
  //     })
  //     const newCart = updateCart.filter(item => item.quantity > 0);
  //     setCart([...newCart]);
  //   }

  //   const productList = products.filter((item)=>{
  //     if(item.id === product_id){
  //     if(item.quantity > 0){
  //       item.quantity -= 1;
  //     }
  //     }
  //     return item;
  //   })
  //   setProducts([...productList]);
  // }


  function handleAdd(product_id){
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => {
        if(product.id === product_id){
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      return updatedProducts;
    });
  
    // Check if the product is already in the cart
    const cartProduct = cart.find(item => item.id === product_id);
    if(cartProduct){
      setCart(prevCart => {
        const updatedCart = prevCart.map(item => {
          if(item.id === product_id){
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        const totalCount = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalCount);
        return updatedCart;
      });
    }
    else{
      const productToAdd = products.find(product => product.id === product_id);
      setCart(prevCart => {
        const updatedCart = [...prevCart, { ...productToAdd, quantity: 1 }];
        const totalCount = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalCount);
        return updatedCart;
      });
    }
  }
  
  function handleRemove(product_id){
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => {
        if(product.id === product_id && product.quantity > 0){
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return updatedProducts;
    });
  
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if(item.id === product_id && item.quantity > 0){
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      const newCart = updatedCart.filter(item => item.quantity > 0);
      const totalCount = newCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalCount);
      return newCart;
    });
  }
  

  return (
    <div id="main-container">

      {/* Product Container */}
      <div className="product-cont">
        <h2>Products</h2>
      {
        products.map((item,id)=>{
          return (
              <div id="product-subcont" key={id}>
                {/* <p>{item.id}</p> */}
                <h2 key={id}>{item.name}</h2>
                <h2>{item.price}</h2>
                <div id='btn-cont'>
                  <button onClick={()=>{handleRemove(item.id)}}>-</button>
                  <h2>{item.quantity}</h2>
                  <button onClick={()=>{handleAdd(item.id)}}>+</button>
                </div>
                {/* <button onClick={handleAdd(id)}>Add</button> */}
              </div>
          )
        })
      }
      </div>

      {/* Cart Container */}
      <div id="cart-container">
        <h2>Cart</h2>
        {
          cart.map((item,id)=>{
            return(
              <div id="cart-row" key={id}>
                <h2>{item.name}</h2>
                <div id="cart-right-sec">
                  <h2>{item.quantity} * </h2>
                  <h2>{item.price}</h2>
                </div>
              </div>
            )
          })
        }{
          total === 0 ? <p style={{color: "red", fontFamily : "cursive"}}>Your cart is empty !</p> : <p></p>
        }
        <div id="total">
          <div id="cart-row-end">
            <h2>Total</h2>
            <h2>{total}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
