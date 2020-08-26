import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../App';

class Product extends Component {
    state={product: {title: "", description: "", category: "", image_urls: []}}
    componentDidMount() {
        fetch('http://localhost:8080/products/1')
        .then(resp => resp.json())
        .then(product => {
            console.log(product);
            this.setState({
                product: product
            })
        })
    }
    render() {
        return (
            <div className="products">
                <h1>{this.state.product.title}</h1>
                <p>{this.state.product.description}</p>
                <Image cloudName={CLOUD_NAME} publicId={`${this.state.product.category}/${this.state.product.sku}/${this.state.product.image_urls[0]}`}>
                </Image>
            </div>
        )
    }
}
export default Product;