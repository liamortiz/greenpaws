import React, { Component } from 'react';
import ShopDropdown from './ShopDropdown';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.shopElement = React.createRef();
    }
    showDropDown = (e) => {
        const targetName = e.target.getAttribute('name');
        if (targetName === 'shop') {
            this.shopElement.current.style='max-height: 1000px';
        }
    }
    hideDropDown = () => {
        this.shopElement.current.style='max-height: 0';
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <>
            <nav>
                <NavLink to="/">
                    <h1 className="logo">greenpaws<i className="icon paws"></i>
                    </h1>
                </NavLink>
    
                <ul className="nav-items basic" onMouseLeave={this.hideDropDown}>
                    <li 
                    name="shop"
                    onMouseEnter={this.showDropDown}
                    className="expandable">
                        <NavLink to="/products">Shop</NavLink>
                        <div ref={this.shopElement} className="dropdown shop-dropdown">
                            <ShopDropdown />
                        </div>
                    </li>
    
                    <li><NavLink to="/brands">Brands</NavLink></li>
    
                    <li><NavLink to="/sales" activeClassName='is-active' >On Sale</NavLink></li>
                </ul>
    
                <form className="search-bar">
                    <div className="search-wrapper">
                        <input type="text" placeholder="Search Our Store" value={this.state.query} onChange={this.handleChange}/>
                        <button type="submit"><i className= "icon search"></i></button>
                    </div>
                </form>
    
                <div className="nav-items right-side">
                    <NavLink to="/register">
                        <div className="small-container account-container">
                            <i className="icon account"></i>
                            <p>Account</p>
                        </div>
                    </NavLink>
                    <NavLink to="/cart">
                        <div className="small-container cart-container">
                            <i className="icon cart"></i>
                            <p>Cart</p>
                            <span id="products-in-cart"><p> {this.props.productsInCart} </p></span>
                        </div>
                    </NavLink>
                </div>
            </nav>
             <div className="discount-bar">FREE 1-3 DAY SHIPPING OVER $30!</div>
             </>
        )
    }
}

const mstp = state => {
    return {productsInCart: state.users.user.productsInCart.length}
}

export default connect(mstp, null)(Navigation);