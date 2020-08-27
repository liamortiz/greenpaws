import React from 'react';
import { Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../App';

const Product = props => {
    const { title, description, price, image_urls, category, sku } = props.product
    return (
        <>
            <h1>{title}</h1>
            <p>{price}</p>
    <p>{sku}</p>
            <Image cloudName={CLOUD_NAME} publicId={`${category}/${sku}/${image_urls[0]}`} />
            <p>{description}</p>
        </>
    )
}
export default Product;