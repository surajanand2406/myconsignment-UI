/** @format */

import React, { PureComponent } from "react";
import { Slider, Divider, Checkbox, Menu, Select, Button, Card } from "antd";
import { DownOutlined, HeartFilled } from "@ant-design/icons";
import HeaderView from "../../Header/Header";
import Footer from "../../Footer/Footer";

import "./productStore.scss";

const { Option } = Select;

const children = [];

class ProductStore extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  render() {
    return (
      <div className="productStoreMain">
        <HeaderView />
        <div className="productStore container">
          <div className="leftStore">
            <div className="filterSeller">
              <span className="filterHead">Filter</span>
              <div className="catagry">
                <h3> Category</h3>
                <ul>
                  <li>
                    <a>suits (433)</a>
                  </li>
                  <li>
                    <a>shirts (453)</a>
                  </li>
                  <li>
                    <a>trousers (345)</a>
                  </li>
                  <li>
                    <a>wedding (234)</a>
                  </li>
                  <li>
                    <a>jackets (333)</a>
                  </li>
                </ul>
              </div>
            </div>
            <Divider orientation="right" plain></Divider>
            <div className="pricer">
              <h3>PRICE</h3>
              <Slider defaultValue={30} tooltipVisible />
            </div>
            <Divider orientation="right" plain></Divider>
            <div className="colorItem">
              <h3>COLOR</h3>
              <ul>
                <li className="blckcheck">
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Black
                </li>
                <li className="orgcheck">
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Orange
                </li>
                <li className="blueheck">
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Blue
                </li>
                <li className="browncheck">
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Brown
                </li>
                <li className="greencheck">
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Desk green
                </li>
              </ul>
            </div>

            {/*  */}
            <Divider orientation="right" plain></Divider>
            <div className="colorItem">
              <h3>TYPE</h3>
              <ul>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Single Breasted
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Mandarin
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  Todexdo Style
                </li>
              </ul>
            </div>
            <Divider orientation="right" plain></Divider>
            <div className="colorItem">
              <h3>SIZE</h3>
              <ul>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  XXS
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  XS
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />S
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />M
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />L
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  XL
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  XXL
                </li>
                <li>
                  <Checkbox defaultChecked={false} className="colorCheck" />
                  XXXL
                </li>
              </ul>
            </div>
          </div>
          <div className="rightStore">
            <div className="storeName">
              <div className="storeUser">
                <h3>Bruce{"'s"} Listings</h3>
              </div>
              <div className="storeChoice">
                <div className="storeDropdown">
                  <span className="ldropdownlabel">Show</span>
                  <Select
                    size={"small"}
                    defaultValue="20 per page"
                    onChange={this.handleChange}
                    style={{ width: 200 }}
                  >
                    <Option value="20"> 20 per page</Option>
                    <Option value="50"> 50 per page</Option>
                    <Option value="100"> 100 per page</Option>
                    <Option value="all"> All </Option>
                  </Select>
                </div>
                <div className="storeDropdown">
                  <span className="ldropdownlabel">Sort by</span>
                  <Select
                    size={"small"}
                    defaultValue="Popularity"
                    onChange={this.handleChange}
                    style={{ width: 200 }}
                  >
                    <Option value="p"> Popular</Option>
                    <Option value="t"> Trending</Option>
                    <Option value="n"> New Arrivals</Option>
                  </Select>
                </div>
              </div>

              {/* <div className="storeDropdown">
                            View
                        <Select  size={"small"} defaultValue="Your Choice" onChange={this.handleChange} style={{ width: 200 }}>
                            <Option value=""> </Option>
                            <Option value=""> </Option>
                        </Select>
                        </div> */}
            </div>
            <div className="allItemList">
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img1-2.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img2-2.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img3.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img4.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img5.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img6.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
              <Card className="cardItem">
                {/* <div className="allItemListing"> */}
                <div className="itemImage">
                  <img src={require("../../imgs/img7.png")} />
                </div>
                <div className="itemDescription">
                  <div className="productHeading">
                    <h4>Net Semi-stiched Dress</h4>
                    <span className="itemPrice">$199</span>
                  </div>
                  <div className="itemParag">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <span className="itemSize">Size: 38, 40, 42, 46</span>
                    <Button>ADD TO CART</Button>
                  </div>
                </div>
                <div className="actionSec">
                  <a>
                    <i className="compareIcon" />
                  </a>
                  <a>
                    <HeartFilled />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductStore;
