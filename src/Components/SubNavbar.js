import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from './my1.png'
import './CSS/SubNavbarCss.css';
import { Button, Menu, Dropdown, Divider, Card, List, Modal, Skeleton, Avatar, Input, Tooltip, Slider, Rate, message } from 'antd'

import { Icon } from '@ant-design/compatible';

class SubNavbar extends Component {
    constructor() {
        super();
        this.state = { color: "red" };
    }
    render() {
        const searchStyle = {
            transition: 'all 1s ease'
        }
        return (
            <div className="subnavbar-container">
                <Link to="/" className="logo">
                    <img src={Logo} alt='logo not found' style={{ width: this.state.windowWidth <= 576 ? '100%' : '200px', height: '170px' }} />
                </Link>
                <div className="search-box" style={{ ...searchStyle }}>
                    <Input onKeyDown={e => {
                        if (e.which === 13 || e.keyCode === 13) {
                            this.handleSearch(e)
                        }
                    }} onSubmit={this.handleSearch} name='searchText' onChange={e => {
                        this.setState({
                            searchText: e.target.value
                        })
                    }} style={{ width: this.state.windowWidth <= 768 ? '70%' : '50%', border: 'solid 1px gray', borderRadius: 15, backgroundColor: '#eeeeee' }} size="large" placeholder="Search Listings" />
                </div>
                <div style={{display:'flex', paddingLeft:'90px',paddingRight:'90px'}}>
                <Icon type="heart" theme="outlined" style={{ fontSize: '16px', color: '#fff' }}/>
                <Icon type="shopping-cart" theme="outlined" style={{ fontSize: '16px', color: '#fff', paddingLeft:'10px' }}/>
                </div>
            </div>);
    }
}

export default SubNavbar