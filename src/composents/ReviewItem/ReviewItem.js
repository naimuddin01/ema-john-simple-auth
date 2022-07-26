import React from "react";

const ReviewItem = (props) => {
    console.log("REMOVE Item Props : ", props)
    const {name, quantity, img, key, price} = props.product;
    const ReviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        padding:'10px',
        marginLeft: '100px',
        
    }
    const textStyle = {
        padding:'10px',
        marginLeft: '10px',

    }
    return (
        <div style={ReviewItemStyle} className = "product">
            <div>
                <img src={img} alt="" />
            </div>

            <div style={textStyle}>
                <h4 className = "product-name">{name}</h4>
                <p>Quantity : {quantity}</p>
                <p><small>$ {price}</small></p>
                <br />
                <button 
                    className = "main-button"
                    onClick={() => props.removeProduct(key)}
                >Remove</button>
            </div>
            
        </div>
    );
};

export default ReviewItem;