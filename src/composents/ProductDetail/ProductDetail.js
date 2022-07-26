import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    //app.js thake pathano key passe useParams er maddome. (product er data payor jonno)
    const {productKey} =useParams()
    const product = fakeData.find(pdd => pdd.key === productKey);
    console.log("productDetails-product",product);
    return (
        <div>
            <h1>{productKey} product Details </h1>
            <Product showAddToCart = {false} product = {product}></Product>
        </div>
    );
};

export default ProductDetail;