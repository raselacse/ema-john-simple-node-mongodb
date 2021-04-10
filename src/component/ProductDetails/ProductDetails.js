import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    return (
        <>
            <h1>Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </>
    );
};

export default ProductDetails;