import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    cart.forEach(product => {
        console.log(product.quantity)
        total = total + product.price * (product.quantity || 1);
    });

    let shipping = 0;
    if(total > 0){
        shipping = 12.99;
    }
    else if(total> 15){
        shipping = 4.99;
    }
    else if(total > 35){
        shipping = 0;
    }

    const tax = total/10;

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax: {tax}</small></p>
            <p>Total Price: {total+shipping+tax}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;