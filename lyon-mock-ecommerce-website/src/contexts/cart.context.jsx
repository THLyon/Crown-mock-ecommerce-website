import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd)  => {
    //find if cartItems contains productToAdd
   const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id); 
    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id  
            ? {...cartItem, quantity: cartItem.quantity +1}
            : cartItem
        )
    };
    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]; 
}; 

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove; 
    //check if quantity is equal to 1, if truthy, remove item from cart; 
        //else return back cart items with matcvhing cart item with reduced quantity; 
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); 
    }; 

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id  
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
    };


export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [], 
    addItemToCart: () => {},
    removeItermFromCart: () => {},
    cartCount: 0, 
}); 



export const CartProvider = ({children} ) => {
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);  

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem )=> total + cartItem.quantity, 0); 
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); 
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart};

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>;
};