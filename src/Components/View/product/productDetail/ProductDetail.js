/** @format */

import React, { PureComponent } from "react";
import { Row, Col, Select, Input, Button } from "antd";
import "./ProductDetail.scss";
import { Tabs } from "antd";
import HeaderView from "../../Header/Header";
import Footer from "../../Footer/Footer";
import feature4 from "../../imgs/feature4.png";
import feature1 from "../../imgs/feature1.png";
import feature2 from "../../imgs/feature2.png";
import feature3 from "../../imgs/feature3.png";
import {
  DownOutlined,
  HeartOutlined,
  StarFilled,
  ArrowRightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Option } = Select;

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="homePageMain">
        <HeaderView />
        <div className="container productDetails">
          <Row className="comnSec blkRow">
            <Col span={10} className="leftBlk">
              <div className="innerBlk imgblock">
                <img src={require("../../imgs/statue.png")} />
              </div>
              <ul className="smallImgs">
                <li>
                  <img src={require("../../imgs/statue.png")} />
                </li>
                <li>
                  <img src={require("../../imgs/statue2.png")} />
                </li>
                <li>
                  <img src={require("../../imgs/statue3.png")} />
                </li>
                <li>
                  <img src={require("../../imgs/statue4.png")} />
                </li>
                <li>
                  <img src={require("../../imgs/statue5.png")} />
                </li>
              </ul>
            </Col>
            <Col span={14} className="rgtBlk">
              <div className="innerBlk">
                <Row>
                  <Col span={16}>
                    <h3>Magnoom Slim Women Blue Jeans</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque feugiat metus lorem, quis aliquam quam lacinia id.
                      Aenean arcu leo, viverra sit amet justo id.
                    </p>
                    <ul className="infoList">
                      <li className="ratingsec">
                        <span>3.8</span>1342 Ratings
                      </li>
                      <li>SKU : 235252</li>
                      <li>Add Your Review</li>
                      <li className="greentxt">InStock</li>
                    </ul>
                  </Col>
                  <Col span={8}>
                    <div className="shippingInfo">
                      <h3>Shipping Information</h3>
                      <ul>
                        <li>
                          International shipping<a>$299</a>
                        </li>
                        <li>
                          1 day delivery Charge<a>$1000</a>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <h2 className="price">
                  $299 <span>$399</span>
                </h2>
                <div className="storeName">
                  <div className="storeChoice">
                    <div className="storeDropdown">
                      <span className="ldropdownlabel">Size</span>
                      <Select
                        size={"small"}
                        defaultValue="m"
                        onChange={this.handleChange}
                        style={{ width: 150 }}
                      >
                        <Option value="l"> L</Option>
                        <Option value="m"> M </Option>
                        <Option value="x"> XL</Option>
                        <Option value="2x"> XXL</Option>
                      </Select>
                    </div>
                    <div className="storeDropdown">
                      <span className="ldropdownlabel">Color</span>
                      <Select
                        size={"small"}
                        defaultValue="g"
                        onChange={this.handleChange}
                        style={{ width: 150 }}
                      >
                        <Option value="r"> Red</Option>
                        <Option value="g"> Green</Option>
                        <Option value="b"> Blue</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="storeDropdown2">
                    <span className="ldropdownlabel">QTY</span>
                    <Input placeholder="Basic usage" />
                  </div>
                </div>
                <div className="btnSec">
                  <Button className="buyButtn" type="primary" htmlType="submit">
                    Buy Now
                  </Button>
                  <Button
                    className="cartButtn btnTrasparent "
                    type="primary"
                    htmlType="submit"
                  >
                    Add to Cart
                  </Button>
                </div>
                <ul className="actionbtns">
                  <li>
                    <a className="shareFrnd">share with Friend</a>
                  </li>
                  <li>
                    <a className="wishList">Add to Wishalist</a>
                  </li>
                  <li>
                    <a className="addtoCompare">Add to Compare</a>
                  </li>
                </ul>
                <ul className="socialLinks">
                  <li>Share now on</li>
                  <li>
                    <a>
                      {" "}
                      <img src={require("../../imgs/twitterIcon.png")} />
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <img src={require("../../imgs/fbicon.png")} />
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <img src={require("../../imgs/linkedin.png")} />
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <img src={require("../../imgs/instagram.png")} />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Descriptions" key="1">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.{" "}
              </p>
              <ul>
                <li>
                  <span>Style Code</span> SB-BLUE
                </li>
                <li>
                  <span>Occasion</span>Wedding Formal
                </li>
                <li>
                  <span>Vents</span>Double Vent at back
                </li>
                <li>
                  <span>Pockets</span>2 Front Slip Pockets
                </li>
                <li>
                  <span>Fabric Care</span>Dry Clean Only
                </li>
                <li>
                  <span>Pack of</span>1
                </li>
                <li>
                  <span>Sales Package</span>B;azer, Hanger, Cover
                </li>
                <li>
                  <span>Other Details</span>Dressing Men since 1991. Known for
                  exceptional craftsmanship and contemporary tailoring, This
                  Coat/Jacket can be worn to formal and informal occasions
                  alike.
                </li>
              </ul>
            </TabPane>
            <TabPane tab="Specifications" key="2">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.{" "}
              </p>
              <ul>
                <li>
                  <span>Style Code</span> SB-BLUE
                </li>
                <li>
                  <span>Occasion</span>Wedding Formal
                </li>
                <li>
                  <span>Vents</span>Double Vent at back
                </li>
                <li>
                  <span>Pockets</span>2 Front Slip Pockets
                </li>
                <li>
                  <span>Fabric Care</span>Dry Clean Only
                </li>
                <li>
                  <span>Pack of</span>1
                </li>
                <li>
                  <span>Sales Package</span>B;azer, Hanger, Cover
                </li>
                <li>
                  <span>Other Details</span>Dressing Men since 1991. Known for
                  exceptional craftsmanship and contemporary tailoring, This
                  Coat/Jacket can be worn to formal and informal occasions
                  alike.
                </li>
              </ul>
            </TabPane>
            <TabPane tab="Ratings & Review" key="3">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.{" "}
              </p>
              <ul>
                <li>
                  <span>Style Code</span> SB-BLUE
                </li>
                <li>
                  <span>Occasion</span>Wedding Formal
                </li>
                <li>
                  <span>Vents</span>Double Vent at back
                </li>
                <li>
                  <span>Pockets</span>2 Front Slip Pockets
                </li>
                <li>
                  <span>Fabric Care</span>Dry Clean Only
                </li>
                <li>
                  <span>Pack of</span>1
                </li>
                <li>
                  <span>Sales Package</span>B;azer, Hanger, Cover
                </li>
                <li>
                  <span>Other Details</span>Dressing Men since 1991. Known for
                  exceptional craftsmanship and contemporary tailoring, This
                  Coat/Jacket can be worn to formal and informal occasions
                  alike.
                </li>
              </ul>
            </TabPane>
            <TabPane tab="Shipping Information" key="4">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.{" "}
              </p>
              <ul>
                <li>
                  <span>Style Code</span> SB-BLUE
                </li>
                <li>
                  <span>Occasion</span>Wedding Formal
                </li>
                <li>
                  <span>Vents</span>Double Vent at back
                </li>
                <li>
                  <span>Pockets</span>2 Front Slip Pockets
                </li>
                <li>
                  <span>Fabric Care</span>Dry Clean Only
                </li>
                <li>
                  <span>Pack of</span>1
                </li>
                <li>
                  <span>Sales Package</span>B;azer, Hanger, Cover
                </li>
                <li>
                  <span>Other Details</span>Dressing Men since 1991. Known for
                  exceptional craftsmanship and contemporary tailoring, This
                  Coat/Jacket can be worn to formal and informal occasions
                  alike.
                </li>
              </ul>
            </TabPane>
          </Tabs>
          <div className="recentPro">
            <div className="relatedItemList">
              <h3 className="headRelatedP">Related Product</h3>
              <Row className="FeaturedProductSec comnSec comnSecFeature">
                <Col span={6}>
                  <div className="blockcmn">
                    <div className="imgsmallFeature">
                      <img src={feature1} />
                    </div>
                    <div className="textSecFeature">
                      <p>
                        Lee Pucker design. Leather botinki for handsome
                        designers. Free shipping.
                      </p>
                      <h3>$13.95</h3>
                      {/* <span>Eligible for Shipping To Mars or somewhere else</span> */}
                      <div className="ftrsec">
                        <div className="left">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <span className="rating">4.87</span>
                        </div>
                        <div className="right">
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <HeartOutlined />
                          </Button>
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <img src={require("../../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="blockcmn">
                    <div className="imgsmallFeature">
                      <img src={feature2} />
                    </div>
                    <div className="textSecFeature">
                      <p>
                        Lee Pucker design. Leather botinki for handsome
                        designers. Free shipping.
                      </p>
                      <h3>$13.95</h3>
                      {/* <span>Eligible for Shipping To Mars or somewhere else</span> */}
                      <div className="ftrsec">
                        <div className="left">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <span className="rating">4.87</span>
                        </div>
                        <div className="right">
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <HeartOutlined />
                          </Button>
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <img src={require("../../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="blockcmn">
                    <div className="imgsmallFeature">
                      <img src={feature3} />
                    </div>
                    <div className="textSecFeature">
                      <p>
                        Lee Pucker design. Leather botinki for handsome
                        designers. Free shipping.
                      </p>
                      <h3>$13.95</h3>
                      {/* <span>Eligible for Shipping To Mars or somewhere else</span> */}
                      <div className="ftrsec">
                        <div className="left">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <span className="rating">4.87</span>
                        </div>
                        <div className="right">
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <HeartOutlined />
                          </Button>
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <img src={require("../../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="blockcmn">
                    <div className="imgsmallFeature">
                      <img src={feature4} />
                    </div>
                    <div className="textSecFeature">
                      <p>
                        Lee Pucker design. Leather botinki for handsome
                        designers. Free shipping.
                      </p>
                      <h3>$13.95</h3>
                      {/* <span>Eligible for Shipping To Mars or somewhere else</span> */}
                      <div className="ftrsec">
                        <div className="left">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <span className="rating">4.87</span>
                        </div>
                        <div className="right">
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <HeartOutlined />
                          </Button>
                          <Button
                            type="primary"
                            shape="round"
                            size={"Small"}
                            className="heartbtn"
                          >
                            <img src={require("../../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="seeMore">See More</div>
              </Row>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductDetail;
