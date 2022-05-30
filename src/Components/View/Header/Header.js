/** @format */

import React, { Component } from "react";
import "./Header.scss";
import { Select, Button, Input } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import logo from "../imgs/logo.png";
import { Route, Redirect } from "react-router";
import { withRouter } from "react-router-dom";
const { Option } = Select;
const { Search } = Input;

export class HeaderView extends Component {
  handleCurrencyChange = (value) => {
    console.log(`selected ${value}`);
  };

  handleLanguageChange = (value) => {
    console.log(`selected ${value}`);
  };
  goToRoute = (e) => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="loginHeader">
        <div className="firstUpper">
          <div className="leftFirstUpper">
            <Select
              defaultValue="English"
              style={{ width: 120 }}
              onChange={this.handleLanguageChange()}
            >
              <Option value="English">English</Option>
              <Option value="Chinies">Chinese</Option>
              <Option value="Francee">French</Option>
            </Select>
            <Select
              defaultValue="usd"
              style={{ width: 120 }}
              onChange={this.handleCurrencyChange()}
            >
              <Option value="usd">USD</Option>
              <Option value="euro">EURO</Option>
              <Option value="rupee">RUPEE</Option>
            </Select>
          </div>
          <div className="rightFirstUpper">
            <Button
              type="primary"
              shape="round"
              size={"Small"}
              className="loginBtn roundBtn"
              onClick={(e) => this.goToRoute(e)}
            >
              Login
            </Button>
            <Button
              type="primary"
              shape="round"
              size={"Small"}
              className="signupBtn roundBtn"
            >
              Register
            </Button>
          </div>
        </div>

        <div className="secondUpper">
          <div className="left">
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="search">
              <Search
                placeholder="Search"
                onSearch={(value) => console.log(value)}
              />
            </div>
          </div>
          <div className="cart_buy">
            <HeartOutlined />
            {/* <HeartTwoTone twoToneColor="#eb2f96" /> */}
            <ShoppingCartOutlined />
          </div>
        </div>
        <ul className="btmHeadr">
          <li>
            <a>Live Auctions</a>
          </li>
          <li>
            <a>Custom Made</a>
          </li>
          <li>
            <a>Exclusive Services</a>
          </li>
          <li>
            <a>Sponsorship</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(HeaderView);
