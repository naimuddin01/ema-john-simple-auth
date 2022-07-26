import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';



const Shop = () => {
    
    const first10 = fakeData.slice(0, 15); 
    // console.log(first10);

    const [products, setProducts] = useState(first10)
    // console.log("Data", first10)

    const [cart, setcart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart)//database thake key gulo nisce
        const previousCart = productsKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);//dataBase er key er sathe fateData er product key match kore product nisce
            // database e key pathasce bole amra valu ta pasce
            product.quantity = savedCart[existingKey] //database e jokhon amra key pathay tokhon amra value ta pai
            // console.log("getValue "+existingKey, savedCart[existingKey]);
            return product;
        })

        // console.log(savedCart)
        // console.log(productsKeys)
        setcart(previousCart)
    },[])

    const handleAddProduct = (product) =>{

        console.log("cart handel", product)
        const toBeAddedKey = product.key;

        console.log("handle cart",cart)
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey); //find ekta object return kore
        console.log("same product",sameProduct)
        
        let count = 1;
        let newCart;
        if (sameProduct){
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeAddedKey) //filter ekta array return kore
            console.log("others",others);
            newCart = [...others, sameProduct]
            console.log("if newCart",newCart)

        }
        else{

            product.quantity = 1;
            newCart = [...cart, product]
            console.log(" else newCart",newCart)
        }

        console.log('product add', product)

        setcart(newCart);

        //quentity kaj er jon
        // const sameProduct = newCart.filter(pd => pd.key === product.key)
        // const count = sameProduct.length;
        
        addToDatabaseCart(product.key, count) //productkey & quentity
    } 

    return (
        <div className='twin-container'>
            <h3>{products.length}</h3>

            <div className="product-container">
                
                    {
                        products.map(pd => <Product
                             key = {pd.key}
                             showAddToCart = {true}
                             handleAddProduct = {handleAddProduct}
                             product = {pd}>
                             console.log("product",product);
                             
                            </Product>)  
                    }
                    
            </div>

            <div className="cart-container">
                <Cart cart = {cart}>
                    {/* link er maddome Review.js component e jasse */}
                    <Link to="/review"> 
                        <button review ={cart} className='main-button'>Review Button</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;