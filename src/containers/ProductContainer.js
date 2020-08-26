import React, { Component } from 'react';
import Product from '../components/Product';

class ProductContainer extends Component {

    render() {
        return (
            <div className = "product-wrapper">
                <Product />
            </div>
        )
    }
}
export default ProductContainer;