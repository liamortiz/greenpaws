import React, { Component } from 'react';
import { BASE_URL } from '../../App';

class FilterSettings extends Component {
    state = {
        brands: [],
        filterPrices: [],
        filterReviews: []
    }
    componentDidMount() {
        this.fetchAllBrands();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            this.setFilterPrices();
            this.setFilterReviews();
        }
    }

    fetchAllBrands() {
        fetch(BASE_URL + '/brands')
            .then(resp => resp.json())
            .then(data => this.setBrandInputs(data))
    }

    setBrandInputs({brands}) {
        const brandInputs = brands.map((brand, index) => <span key={index}><input type="checkbox" name={brand.name} value={brand.name} />{brand.name} ({brand.count})</span>);
        this.setState({ brands: brandInputs })
    }

    setFilterPrices() {
        const priceGroups={
            '<10': 0,
            '10-25': 0,
            '25-50': 0,
            '50-100': 0
        }
        this.props.products.forEach(productElement => {
            const product = productElement.props.product;
            const productPrice = Math.floor(product.price);

            if (productPrice < 10) priceGroups['<10']++
            if (productPrice >= 10 && productPrice < 25) priceGroups['10-25']++
            if (productPrice >= 25 && productPrice < 50) priceGroups['25-50']++
            if (productPrice >= 50 && productPrice <= 100) priceGroups['50-100']++
        })
        const filterPrices = [
            <span key={0}><input type="checkbox" name='<10' value='<10' />Less Than $10 ({priceGroups['<10']})</span>,
            <span key={1}><input type="checkbox" name='<10' value='10-25' />$10 to $25 ({priceGroups['10-25']})</span>,
            <span key={2}><input type="checkbox" name='<10' value='25-50' />$25 to $50 ({priceGroups['25-50']})</span>,
            <span key={3}><input type="checkbox" name='<10' value='50-100' />$50 to $100 ({priceGroups['50-100']})</span>
        ]
        this.setState({
            filterPrices
        })
    }

    setFilterReviews() {
        const ratings = this.props.products.map(product => product.props.product.average_rating);
        const ratingElements = [];
        for (let i = 1; i <= 5; i++) {
            const quantity = ratings.filter(rating => rating==i).length
            const button = <button name={i} key={i}>
                <span className={(i>=1) ? "star star-full" : "star"}></span>
                <span className={(i>=2) ? "star star-full" : "star"}></span>
                <span className={(i>=3) ? "star star-full" : "star"}></span>
                <span className={(i>=4) ? "star star-full" : "star"}></span>
                <span className={(i>=5) ? "star star-full" : "star"}></span>({quantity})
            </button>
            ratingElements.push(button)
        }
        this.setState({ 
            filterReviews: ratingElements
        })
    }
    render() {
        return (
            <>
                <div className="filter filter-price">
                    <h2>Price</h2>
                    <form onChange={this.props.filterByPrice}>
                        {this.state.filterPrices}
                    </form>
                </div>
                <div className="filter filter-brand">
                    <h2>Brands</h2>
                    <div className="brand-names">
                        {this.state.brands}
                    </div>
                </div>
                <div className="filter filter-reviews">
                    <h2>Average Rating</h2>
                    {this.state.filterReviews}
                </div>
            </>
        )
    }
}
export default FilterSettings;