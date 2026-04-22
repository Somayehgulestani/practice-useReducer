import { useReducer, useState } from "react";

const intial = { cart: [], input: "" };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, cart: [...state.cart, action.payload] };
    case "delete":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "inc":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "dec":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    case "setInput":
      return { ...state, input: action.payload };

    default:
      return console.log("invalid data");
  }
}
export default function CartApp() {
  //   const [cart, setCart] = useState([]);
  //   const [input, setInput] = useState("");

  const [state, dispatch] = useReducer(reducer, intial);

  // add product
  const addProduct = () => {
    if (!state.input.trim()) return;

    // const newProduct = {
    //   id: Date.now(),
    //   name: input,
    //   quantity: 1,
    // };

    // setCart([...cart, newProduct]);
    // setInput("");

    dispatch({
      type: "add",
      payload: {
        id: Date.now(),
        name: state.input,
        quantity: 1,
      },
    });

    dispatch({ type: "setInput", payload: "" });
  };

  // delete product
  const deleteProduct = (id) => {
    // setCart(cart.filter((item) => item.id !== id));
    dispatch({ type: "delete", payload: id });
  };

  // increase quantity
  const increaseQty = (id) => {
    // setCart(
    //   cart.map((item) =>
    //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    //   ),

    // );
    dispatch({ type: "inc", payload: id });
  };

  // decrease quantity
  const decreaseQty = (id) => {
    // setCart(
    //   cart.map((item) =>
    //     item.id === id && item.quantity > 1
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item,
    //   ),
    // );
    dispatch({ type: "dec", payload: id });
  };

  // total items
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Shopping Cart</h2>

      <input
        value={state.input}
        // onChange={(e) => setInput(e.target.value)}
        onChange={(e) =>
          dispatch({ type: "setInput", payload: e.target.value })
        }
        placeholder="Enter product name..."
      />
      <button onClick={addProduct}>Add</button>

      <h3>Total Items: {totalItems}</h3>

      <ul>
        {state.cart.map((item) => (
          <li key={item.id}>
            {item.name} (x{item.quantity})
            {/* <button onClick={() => increaseQty(item.id)}>➕</button>
            <button onClick={() => decreaseQty(item.id)}>➖</button>
            <button onClick={() => deleteProduct(item.id)}>❌</button> */}
            <button onClick={() => increaseQty(item.id)}>➕</button>
            <button onClick={() => decreaseQty(item.id)}>➖</button>
            <button onClick={() => deleteProduct(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
