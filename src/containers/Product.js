export const paddPrice = (price) => {
    price = parseFloat(price).toString();
    const decimalIndex = price.indexOf('.') + 1;

    if (decimalIndex === 0) return price;

    const leadingNumbers = price.substr(decimalIndex, price.length);
    price = parseFloat(leadingNumbers.length < 2 ? price + '0' : price);
    return price.toFixed(2)
}
export const getDiscountPrice = (product) => {
    return paddPrice((product.price - ((product.price / 100) * product.discount)).toString());
}