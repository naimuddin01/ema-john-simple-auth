import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    console.log("Cart js",cart)
    
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity;
        
    }

    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }

    // const tax =Math.round(totalPrice / 10);
    const tax =totalPrice / 10;

    const formetNumber = num =>{
        const precission = num.toFixed(2)
        return Number(precission)
    }

    const taxMain = + Number(tax).toFixed(2)
    const grandTotal = totalPrice + shipping + taxMain
    
    return (
        <div>
            <h5 className='text-danger text-align-center'>Order Summary</h5>
            <p>Items Order : {cart.length}</p>
            <p>Product Price : {formetNumber(totalPrice)}</p>
            <p><small>Shipping : {formetNumber(shipping)}</small></p>
            <p><small>Tax + Vat : {formetNumber(tax)}</small></p>
            <p className='text-primary'>Total Price : {formetNumber(grandTotal)}</p>
            <br/>

            {
                props.children
            }
            
        </div>
    );
};

export default Cart;