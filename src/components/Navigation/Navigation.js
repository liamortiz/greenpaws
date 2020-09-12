import React, { Component } from 'react';
import ShopDropdown from './ShopDropdown';
import AccountDropdown from './AccountDropdown';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
        this.shopElement = React.createRef();
        this.accountElement = React.createRef();
    }
    showDropDown = (e) => {
        const name = e.target.getAttribute('name');
        if (name === 'shop') {
            this.shopElement.current.style='max-height: 1100px; padding-bottom: .5em';
        } else if (name === 'account') {
            this.accountElement.current.style='max-height: 1100px; padding-bottom: .5em';
        }
    }
    hideDropDown = () => {
        this.shopElement.current.style='max-height: 0; padding-bottom: 0';
        this.accountElement.current.style='max-height: 0; padding-bottom: 0';
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    search = (e) => {
        e.preventDefault();
        window.location=`/products/?name=${this.state.query}`
    }

    render() {
        return (
            <>
            <NavLink to="/" className="mobile-logo">
                    <h1>greenpaws<i className="icon paws"></i></h1>
            </NavLink>
            <nav>
                <NavLink to="/">
                    <h1 className="logo">greenpaws<i className="icon paws"></i></h1>
                </NavLink>
    
                <ul className="nav-items basic" onMouseLeave={this.hideDropDown}>
                    <li>
                        <NavLink name="shop" className="expandable can-hover" to="/products/category/food" activeClassName='is-active' onMouseEnter={this.showDropDown}>Shop</NavLink>
                        <div ref={this.shopElement} className="dropdown shop-dropdown">
                            <ShopDropdown />
                        </div>
                    </li>
    
                    
                    <li><NavLink className="can-hover" to="/sales" activeClassName='is-active' >On Sale</NavLink></li>
                </ul>
    
                <form className="search-bar" onSubmit={this.search}>
                    <div className="search-wrapper">
                        <input type="text" placeholder="Search Our Store" value={this.state.query} onChange={this.handleChange}/>
                        <button type="submit"><i className= "icon search"></i></button>
                    </div>
                </form>
    
                <div className="nav-items right-side" onMouseLeave={this.hideDropDown}>
                    <li onMouseEnter={this.showDropDown} name="account">
                        <NavLink to="/register" name="account">
                            <div className="small-container account-container">
                                <i className="icon account"></i>
                                <p name="account">Account</p>
                            </div>
                        </NavLink>
                        <div ref={this.accountElement} className="dropdown account-dropdown">
                                <AccountDropdown />
                        </div>
                    </li>
                    
                    <li>
                        <NavLink to="/cart">
                            <div className="small-container cart-container">
                                <i className="icon cart"></i>
                                <p>Cart</p>
                                <span id="products-in-cart"><p> {this.props.productsInCart} </p></span>
                            </div>
                        </NavLink>
                    </li>
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