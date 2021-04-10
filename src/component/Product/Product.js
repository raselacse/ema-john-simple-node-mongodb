import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.product;

    return (
        <div className='product'>
            <div >
                <img src={img} alt="" />
            </div>
            <div >
                <h4><Link to={"product/"+key}>{name}</Link></h4>
                <br />
                <p>by: {seller}</p>
                <p>Price: {price}</p>
                <br />
                <p>Onle {stock} left in stock - order soon</p>
                <br/>
                {props.showAddToCart === true && <button 
                    onClick={() => props.handlerAddProduct(props.product)} 
                    className='add-to-cart'>
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;