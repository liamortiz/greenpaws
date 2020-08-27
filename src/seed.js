import faker from 'faker';
import products from './data.json';

const BRANDS=765
const CATES=[
  "beds",
  "collars",
  "feeding_supplies",
  "food",
  "toys"
]

const _random = (min, max) => {
  const discount = Math.floor(Math.random() * (max - min + 1) + min);
  return Math.ceil(discount / 5) * 5
}
const probability = (n) => {
  return Math.floor(Math.random() * 100) <= n;
}

function getDiscount(price) {
  let discount = 0;
  if (probability(60)) {
    discount = 0;
  } else if (probability(20)) {
    discount = _random(5, 30);
  } else if (probability(10)) {
    discount = _random(30, 50);
  } else if (probability(5)) {
    discount = _random(50, 60);
  } else if (probability(2)) {
    discount = _random(60, 75);
  }
  return discount;
}

function seed() {
  products.forEach(product => {
    const brand = Math.floor(Math.random() * BRANDS) + 1;
    const category = CATES.findIndex(cate => cate === product.category) + 1;
    const price = faker.commerce.price();
    const discount = getDiscount(price);

    delete product.category;

    product['brand_id'] = brand;
    product['category_id'] = category;
    product['discount'] = discount;
    product['price'] = price;

    fetch('http://localhost:8080/products/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'product': product})

    }).catch(err => {
      console.log(err);
    })
  })
}

export default seed;