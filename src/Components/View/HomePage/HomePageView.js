/** @format */

import React, { PureComponent } from "react";
import {
  DownOutlined,
  HeartOutlined,
  StarFilled,
  ArrowRightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import HeaderView from "../Header/Header";
import Footer from "../Footer/Footer";
import { Button, Row, Col, Carousel, Input, Popover } from "antd";
import banner from "../imgs/banner.png";
import filter from "../imgs/Filter.png";
import "./homepage.scss";
import arrow from "../imgs/arrow.png";
import arrowleft from "../imgs/Lgtarrow_lft.png";
import arrowrgt from "../imgs/darkarrow_rgt.png";
import feature4 from "../imgs/feature4.png";
import feature1 from "../imgs/feature1.png";
import feature2 from "../imgs/feature2.png";
import feature3 from "../imgs/feature3.png";
import exclusive1 from "../imgs/exclusive1.png";
import exclusive2 from "../imgs/exclusive2.png";
import exclusive3 from "../imgs/exclusive3.png";
import job1 from "../imgs/neck1.png";
import job2 from "../imgs/neck2.png";
import job3 from "../imgs/ring.png";
import { connect } from "react-redux";
import ReactWOW from "react-wow";
import WOW from "wowjs";
import {
  allCatagoryAction,
  exclusiveService,
  featureListing,
  customMadeJobs,
  popularListing,
} from "../../../store/actions/CatagoryAction";
const contentBasic = (
  <div className="affordList">
    <ul className="greychecklist greycheckk">
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Drafts.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Inactive listings.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Participate in auctions and bid.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">
          Hire services from Exclusive Services section.
        </div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">
          Become a verified Artisan (for Pure Artisan Only).
        </div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">
          Become a verified Artisan for Custom made section.
        </div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Report/Suggestion.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Email alerts.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Orders management.</div>
      </li>
      <li>
        <div className="checkk">
          <span class="dot">
            <img src={require("../imgs/tick.png")} />
          </span>
        </div>
        <div className="dotText">Listings Management.</div>
      </li>
    </ul>
  </div>
);

const proUser = (
  <div className="affordList">
    <ul className="y-checklist ychecked">
      <li> Add up to 10 images per listings.</li>
      <li>Add a short video (30 seconds) to each listing.</li>
      <li>
        Connect to connect to External Stores (such as eBay and Etsy) or import
        listings via CSV/XLS.
      </li>

      <li> More detailed Listings.</li>
      <li>
        {" "}
        Get PRO tagged for both platforms (My Consignment and Pure Artisan).
      </li>
      <li> Replicate listings from Pure Artisan to My Consignment.</li>
      <li> Create your own collections/bundles.</li>
      <li> Receive SMS alerts.</li>
      <li> Manage users (such as blocking).</li>
      <li> Allow buyers to make an offer.</li>
    </ul>
  </div>
);

class HomePageView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.allCatagoryAction();
    this.props.featureListing();
    this.props.customMadeJobs();
    this.props.exclusiveServices();
    this.props.popularListing();
    const wow = new WOW.WOW();
    // ---- ^^ const wow = WOW(); maybe new syntax, check docs! ^^----
    wow.init();
  };
  next = () => {
    this.slider.next();
  };
  previouse = () => {
    this.slider.prev();
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      nextArrow: "@@",
      prevArrow: "$$",
    };
    console.log(
      "dsjkfhksdj : ",
      this.props.popularListings && this.props.popularListings
    );
    return (
      <div className="homePageMain">
        <HeaderView />
        <div className="homePage">
          <div className="">
            <div className="container-fluid container bannerWrap">
              <ul className="leftNav">
                <li className="head">
                  <a>
                    <img src={filter} alt="icon" />
                    <h4>Categories</h4>
                  </a>
                </li>
                {this.props.allCategories &&
                  this.props.allCategories.map((allCatagory, index) => (
                    <li span={3} key={index}>
                      <a>
                        <HeartOutlined />
                        {allCatagory.name}
                      </a>
                    </li>
                  ))}
              </ul>
              <div className="rgtBeaner">
                <div className="firstCorousal">
                  <Carousel pauseOnHover={false} autoplay>
                    <div className="bnr1 comnBanner">
                      <div className="bnrText">
                        <h2>Live Auctions</h2>
                        <p>
                          Capability to increase competition through local,
                          domestic and international buyers
                        </p>
                      </div>
                      <Button className="roundBtn">
                        Get started
                        <img src={arrow} />
                      </Button>
                    </div>
                    <div className="bnr2 comnBanner">
                      <div className="bnrText">
                        <h2>Custom Made</h2>
                        <p>
                          Your wish is our command. Within this area buyers are
                          able to post requests for their favorites Artisans
                        </p>
                      </div>
                      <Button className="roundBtn">
                        Get started
                        <img src={arrow} />
                      </Button>
                    </div>
                    <div className="bnr3 comnBanner">
                      <div className="bnrText">
                        <h2 className="wow bounceIn">Exclusive Services</h2>
                        <p>
                          Exclusive Traveler Club members have exclusive use of
                          the resort's best rooms, which aren't available to
                          regular guests.
                        </p>
                      </div>
                      <Button className="roundBtn">
                        Get started
                        <img src={arrow} />
                      </Button>
                    </div>
                    <div className="bnr4 comnBanner">
                      <div className="bnrText">
                        <h2>Sponsorship</h2>
                        <p>
                          Sponsors have outcomes they’re seeking to achieve,
                          like increased brand exposure or new customer
                          acquisition.
                        </p>
                      </div>
                      <Button className="roundBtn">
                        Get started
                        <img src={arrow} />
                      </Button>
                    </div>
                    <div className="bnr5 comnBanner">
                      <div className="bnrText">
                        <h2>Blog</h2>
                        <p>
                          Your wish is our command. Within this area buyers are
                          able to post requests for their favorites Artisans
                        </p>
                      </div>
                      <Button className="roundBtn">
                        Get started
                        <img src={arrow} />
                      </Button>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="container-fluid container secondCorousal">
              <Row className="secondSec comnSec">
                <Carousel pauseOnHover={false} autoplay slidesToShow={3}>
                  <div className="multicarousal">
                    <Col>
                      <div className="block block1">
                        <h3>Custom Made</h3>
                        <p>
                          Your wish is our command. Within this area buyers are
                          able to post requests for their favorites Artisans
                        </p>
                        <a>
                          View
                          <img className="arrowicon" src={arrow} />
                        </a>
                      </div>
                    </Col>
                  </div>
                  <div className="multicarousal">
                    <Col>
                      <div className="block block2">
                        <h3>Exclusive Services</h3>
                        <p>
                          Exclusive Traveler Club members have exclusive use of
                          the resort's best rooms, which aren't available to
                          regular guests.
                        </p>
                        <a>
                          View
                          <img className="arrowicon" src={arrow} />
                        </a>
                      </div>
                    </Col>
                  </div>
                  <div className="multicarousal">
                    <Col>
                      <div className="block block3">
                        <h3>Sponsorship</h3>
                        <p>
                          Sponsors have outcomes they’re seeking to achieve,
                          like increased brand exposure or new customer
                          acquisition.
                        </p>
                        <a>
                          View
                          <img className="arrowicon" src={arrow} />
                        </a>
                      </div>
                    </Col>
                  </div>
                  <div className="multicarousal">
                    <Col>
                      <div className="block block4">
                        <h3>Blog</h3>
                        <p>
                          Your wish is our command. Within this area buyers are
                          able to post requests for their favorites Artisans
                        </p>
                        <a>
                          View
                          <img className="arrowicon" src={arrow} />
                        </a>
                      </div>
                    </Col>
                  </div>
                  <div className="multicarousal">
                    <Col>
                      <div className="block block5">
                        <h3>Live Auctions</h3>
                        <p>
                          Capability to increase competition through local,
                          domestic and international buyers
                        </p>
                        <a>
                          View
                          <img className="arrowicon" src={arrow} />
                        </a>
                      </div>
                    </Col>
                  </div>
                </Carousel>
              </Row>
            </div>
            {/* start new  newCOnbinedListing */}
            <div className="container-fluid container newCOnbinedListing">
              <div className="headSec">
                <h2 className="wow bounceInUp center" data-wow-duration="3s">
                  Featured Listings
                </h2>
                <div className="arrows">
                  <img
                    className="prevFeature"
                    onMouseOver={() => this.previouse()}
                    src={arrowrgt}
                  />
                  <img onMouseOver={() => this.next()} src={arrowrgt} />
                </div>
              </div>
              <Carousel ref={(c) => (this.slider = c)} {...settings}>
                {/* autoplay slidesToShow={4} */}
                <div>
                  <Row
                    className="FeaturedProductSec comnSec comnSecFeature wow bounceInUp"
                    data-wow-duration="3s"
                  >
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="blockcmn">
                        <div className="imgsmallFeature">
                          <img
                            src={
                              this.props.popularListings &&
                              this.props.popularListings[0].imageLinks[0]
                            }
                          />
                        </div>
                        <div className="textSecFeature">
                          <h4>
                            {this.props.popularListings &&
                              this.props.popularListings[0].Category}
                          </h4>
                          <p>
                            {this.props.popularListings &&
                              this.props.popularListings[0].title.substring(
                                0,
                                100
                              )}
                            {/* <a className="showMore">{"  ..."}show more</a> */}
                          </p>
                          <h3>
                            $
                            {this.props.popularListings &&
                              this.props.popularListings[0].price}
                          </h3>
                          {/* <span className="descPop">{this.props.popularListings  && this.props.popularListings[0].title}</span> */}
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="blockcmn">
                        <div className="imgsmallFeature">
                          <img
                            src={
                              this.props.popularListings &&
                              this.props.popularListings[1].imageLinks[0]
                            }
                          />
                        </div>
                        <div className="textSecFeature">
                          <h4>
                            {this.props.popularListings &&
                              this.props.popularListings[0].Category}
                          </h4>
                          <p>
                            {this.props.popularListings &&
                              this.props.popularListings[1].title.substring(
                                0,
                                100
                              )}
                            {/* <a className="showMore">{" ..."}show more</a> */}
                          </p>
                          <h3>
                            $
                            {this.props.popularListings &&
                              this.props.popularListings[1].price}
                          </h3>
                          {/* <span className="descPop">{this.props.popularListings  && this.props.popularListings[1].title}</span> */}
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="blockcmn">
                        <div className="imgsmallFeature">
                          <img
                            src={
                              this.props.popularListings &&
                              this.props.popularListings[2].imageLinks[0]
                            }
                          />
                        </div>
                        <div className="textSecFeature">
                          <h4>
                            {this.props.popularListings &&
                              this.props.popularListings[0].Category}
                          </h4>
                          <p>
                            {this.props.popularListings &&
                              this.props.popularListings[2].title.substring(
                                0,
                                100
                              )}
                            {/* <a className="showMore">{"  ..."}show more</a> */}
                          </p>
                          <h3>
                            $
                            {this.props.popularListings &&
                              this.props.popularListings[2].price}
                          </h3>
                          {/* <span className="descPop">{this.props.popularListings  && this.props.popularListings[2].title}</span> */}
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="blockcmn">
                        <div className="imgsmallFeature">
                          <img
                            src={
                              this.props.popularListings &&
                              this.props.popularListings[3].imageLinks[0]
                            }
                          />
                        </div>
                        <div className="textSecFeature">
                          <h4>
                            {this.props.popularListings &&
                              this.props.popularListings[0].Category}
                          </h4>
                          <p>
                            {this.props.popularListings &&
                              this.props.popularListings[3].title.substring(
                                0,
                                100
                              )}
                            {/* <a className="showMore">{" ..."}show more</a> */}
                          </p>
                          <h3>
                            $
                            {this.props.popularListings &&
                              this.props.popularListings[3].price}
                          </h3>
                          {/* <span className="descPop">{this.props.popularListings  && this.props.popularListings[3].title}</span> */}
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="FeaturedProductSec comnSec comnSecFeature">
                    {/* //// */}
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
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
                                <img src={require("../imgs/cart.png")} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel>
            </div>
            {/* end new  newCOnbinedListing */}
            <div className="container-fluid container exclusiveNew">
              <div className="headSec">
                <h2 className="wow bounceInUp center" data-wow-duration="3s">
                  Exclusive Services
                </h2>

                <div className="arrows">
                  <img src={arrowleft} />
                  <img src={arrowrgt} />
                </div>
              </div>
              <Row className="FeaturedProductSec comnSec">
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img
                        src={
                          this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Images[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img
                        src={
                          this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[1].Images[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[1].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[1].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img
                        src={
                          this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[2].Images[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[2].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[2].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="seeMoreItemdiv">
                <a className="seeMoreItem">See All </a>
              </div>
            </div>

            <div className="container-fluid container recentJobNew">
              <div className="headSec">
                <h2 className="wow bounceInUp" data-wow-duration="3s">
                  Recent Custom Made Jobs
                </h2>
                <div className="arrows">
                  <img src={arrowleft} />
                  <img src={arrowrgt} />
                </div>
              </div>
              <Row className="FeaturedProductSec RecentJobsSec comnSec">
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgWrap sec_one">
                      <img
                        src={
                          this.props.customMade.length > 0 &&
                          this.props.customMade[0].Image
                        }
                      />
                    </div>
                    <div className="textSec">
                      <div className="head d-flex">
                        <span>MEDIA</span>
                        <span>17 days ago</span>
                      </div>
                      <h3>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[0].JobTitle}
                      </h3>
                      <p>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[0].JobDetail}
                      </p>
                      <div className="ftrsec">
                        <div className="left">
                          <span className="userimg img2"></span>
                          <span className="name">Patricia Kemp</span>
                        </div>
                        <div className="right">
                          <a href="#" className="arrowIcon d-flex">
                            {" "}
                            View <ArrowRightOutlined />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgWrap sec_one">
                      <img
                        src={
                          this.props.customMade.length > 0 &&
                          this.props.customMade[1].Image
                        }
                      />
                    </div>
                    <div className="textSec">
                      <div className="head d-flex">
                        <span>MEDIA</span>
                        <span>17 days ago</span>
                      </div>
                      <h3>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[1].JobTitle}
                      </h3>
                      <p>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[1].JobDetail}
                      </p>
                      <div className="ftrsec">
                        <div className="left">
                          <span className="userimg img2"></span>
                          <span className="name">Patricia Kemp</span>
                        </div>
                        <div className="right">
                          <a href="#" className="arrowIcon d-flex">
                            {" "}
                            View <ArrowRightOutlined />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgWrap sec_one">
                      <img
                        src={
                          this.props.customMade.length > 0 &&
                          this.props.customMade[2].Image
                        }
                      />
                    </div>
                    <div className="textSec">
                      <div className="head d-flex">
                        <span>MEDIA</span>
                        <span>17 days ago</span>
                      </div>
                      <h3>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[2].JobTitle}
                      </h3>
                      <p>
                        {this.props.customMade.length > 0 &&
                          this.props.customMade[2].JobDetail}
                      </p>
                      <div className="ftrsec">
                        <div className="left">
                          <span className="userimg img2"></span>
                          <span className="name">Patricia Kemp</span>
                        </div>
                        <div className="right">
                          <a href="#" className="arrowIcon d-flex">
                            {" "}
                            View <ArrowRightOutlined />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="seeMoreItemdiv">
                <a className="seeMoreItem">See All </a>
              </div>
            </div>

            <div className="container-fluid container liveAuctionsNew">
              <div className="headSec">
                <h2
                  className="wow slideInRight"
                  data-wow-duration="4s"
                  data-wow-delay="0.3s"
                >
                  Live {"&"} Upcoming Auctions
                </h2>
              </div>
              <Row className="liveAuctionSec comnSec">
                <Col span={8}>
                  <div
                    className="blockcmn  wow bounceInRight basicUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Live</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp proUser"
                    data-wow-duration="3s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Live</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInLeft platinaUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Upcoming</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    className="blockcmn  wow bounceInDown basicUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Upcoming</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInDown proUser"
                    data-wow-duration="3s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Live</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInRight platinaUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon2">
                      <span>Upcoming</span>
                    </div>
                    <div className="imageSection">
                      <div className="liveAuctionImage">
                        <img
                          src={
                            this.props.customMade.length > 0 &&
                            this.props.customMade[0].Image
                          }
                        />
                      </div>
                      <div className="liveAuctionSubImage">
                        <div className="liveAuctionSubImage1">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                        <div className="liveAuctionSubImage2">
                          <img
                            src={
                              this.props.customMade.length > 0 &&
                              this.props.customMade[0].Image
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="aucTextSec">
                      <a className="certifiedJ">
                        Certified Luxury Jewelry {"&"} Watch-Liquidation!
                      </a>
                      <a className="prestigeP">Prestige Auction Galleries</a>
                      <a className="startD">
                        Started Jul 08, 2020 10:30 PM GMT+5:30
                      </a>
                      <div className="bottomAuc">
                        <span className="auctionLoc">
                          <img
                            className="aucFlag"
                            src={require("../imgs/usPng.jpg")}
                          />
                          US Woodland Hills, CA
                        </span>
                        <button>Bid Now</button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                className="btncontainr wow bounceInDown"
                data-wow-duration="2s"
                data-wow-delay="0.2s"
              >
                <Button className="seemoreAuc">Show All Auctions</Button>
              </div>
            </div>

            <div className="container-fluid container recentBlogNew latestBlogs">
              <div className="headSec">
                <h2
                  className="wow slideInLeft"
                  data-wow-duration="4s"
                  data-wow-delay="0.3s"
                >
                  Latest Blogs
                </h2>
                <div className="arrows">
                  <img src={arrowleft} />
                  <img src={arrowrgt} />
                </div>
              </div>
              <Row className="recentBlogs comnSec">
                <Col span={8}>
                  <div
                    className="block blk1 wow slideInLeft"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imagebox">
                      <img src={require("../imgs/blogLtst1.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        <strong>Headline so boring </strong>You <br />
                        don’t know what to do.
                      </p>
                      <div className="ftrsec d-flex">
                        <span>Andrew Wilkinson</span>
                        <span>7 Min</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="block blk2 wow bounceInDown center"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imagebox">
                      <img src={require("../imgs/blogLtst.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        <strong>Headline so boring </strong>You <br />
                        don’t know what to do.
                      </p>
                      <div className="ftrsec d-flex">
                        <span>Andrew Wilkinson</span>
                        <span>7 Min</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="block blk3 wow slideInRight"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imagebox">
                      <img src={require("../imgs/tech3.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        <strong>Headline so boring </strong>You <br />
                        don’t know what to do.
                      </p>
                      <div className="ftrsec d-flex">
                        <span>Andrew Wilkinson</span>
                        <span>7 Min</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="seeMoreItemdiv">
                <a className="seeMoreItem">See All </a>
              </div>
            </div>

            <div className="container-fluid container bestSettingNew">
              <div className="headSec">
                <h2 className="wow bounceInUp" data-wow-duration="3s">
                  Best Selling Products
                </h2>
                <div className="arrows">
                  <img src={arrowleft} />
                  <img src={arrowrgt} />
                </div>
              </div>
              <Row className="FeaturedProductSec comnSec ">
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgsmall2">
                      <img
                        src={
                          this.props.popularListings &&
                          this.props.popularListings[0].imageLinks[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.popularListings &&
                          this.props.popularListings[0].description.substring(
                            0,
                            100
                          )}
                        <a className="showMore">{"  ..."}show more</a>
                      </p>
                      <h3>
                        $
                        {this.props.popularListings &&
                          this.props.popularListings[0].price}
                      </h3>
                      <span className="descPop">
                        {this.props.popularListings &&
                          this.props.popularListings[0].title}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgsmall2">
                      <img
                        src={
                          this.props.popularListings &&
                          this.props.popularListings[1].imageLinks[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.popularListings &&
                          this.props.popularListings[1].description.substring(
                            0,
                            100
                          )}
                        <a className="showMore">{" ..."}show more</a>
                      </p>
                      <h3>
                        $
                        {this.props.popularListings &&
                          this.props.popularListings[1].price}
                      </h3>
                      <span className="descPop">
                        {this.props.popularListings &&
                          this.props.popularListings[1].title}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgsmall2">
                      <img
                        src={
                          this.props.popularListings &&
                          this.props.popularListings[2].imageLinks[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.popularListings &&
                          this.props.popularListings[2].description.substring(
                            0,
                            100
                          )}
                        <a className="showMore">{"  ..."}show more</a>
                      </p>
                      <h3>
                        $
                        {this.props.popularListings &&
                          this.props.popularListings[2].price}
                      </h3>
                      <span className="descPop">
                        {this.props.popularListings &&
                          this.props.popularListings[2].title}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgsmall2">
                      <img
                        src={
                          this.props.popularListings &&
                          this.props.popularListings[3].imageLinks[0]
                        }
                      />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.popularListings &&
                          this.props.popularListings[3].description.substring(
                            0,
                            100
                          )}
                        <a className="showMore">{" ..."}show more</a>
                      </p>
                      <h3>
                        $
                        {this.props.popularListings &&
                          this.props.popularListings[3].price}
                      </h3>
                      <span className="descPop">
                        {this.props.popularListings &&
                          this.props.popularListings[3].title}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="seeMoreItemdiv">
                <a className="seeMoreItem">See All </a>
              </div>
            </div>

            <div className="container-fluid container technicalServiceNew">
              <div className="headSec">
                <h2
                  className="wow slideInRight"
                  data-wow-duration="2s"
                  data-wow-delay="0.3s"
                >
                  Technical Services
                </h2>

                <div className="arrows">
                  <img src={arrowleft} />
                  <img src={arrowrgt} />
                </div>
              </div>
              <Row className="FeaturedProductSec comnSec">
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img src={require("../imgs/blogLtst1.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img src={require("../imgs/blogLtst2.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[1].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[1].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="blockcmn wow bounceInUp"
                    data-wow-duration="3s"
                  >
                    <div className="imgwarp182 ">
                      <img src={require("../imgs/tech3.jpg")} />
                    </div>
                    <div className="textSec">
                      <p>
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[2].ServiceDescription}
                      </p>
                      <h3>
                        Starting at $
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[0].Price}
                      </h3>
                      <span className="exServiceDescription">
                        {this.props.exclusiveServiced.length > 0 &&
                          this.props.exclusiveServiced[2].ServiceTitle}
                      </span>
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
                            <img src={require("../imgs/cart.png")} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="seeMoreItemdiv">
                <a className="seeMoreItem">See All </a>
              </div>
            </div>

            <div className="container-fluid container sponserShipNew">
              <div className="headSec sponsorshipHead">
                <h2
                  className="wow slideInRight"
                  data-wow-duration="2s"
                  data-wow-delay="0.3s"
                >
                  Sponsorship
                </h2>
              </div>
              <Row className="secondSec comnSec sponsorship">
                <Col span={12}>
                  <div
                    className="block sponsor1 wow slideInLeft"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="textSec">
                      <h3>See What We’re Up To</h3>
                      <a>Learn More</a>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="block sponsor2 wow slideInRight"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="textSec">
                      <h3>Our Community</h3>
                      <a>About Us</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            {/* Affordable pricing */}

            <div className="container-fluid container affordableNew">
              <div className="headSec affordablePriceHead">
                <h2
                  className="wow slideInLeft"
                  data-wow-duration="4s"
                  data-wow-delay="0.3s"
                >
                  Affordable Pricing
                </h2>
                <p
                  className="subHeadeAfford wow swing center"
                  data-wow-duration="3s"
                  data-wow-delay="0.2s"
                >
                  Billed yearly
                </p>
              </div>
              <Row className="FeaturedProductSec affordablePricing comnSec">
                <Col span={6}>
                  <div
                    className="blockcmn  wow bounceInRight basicUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon ribbon-top-right basicRibbon">
                      <span className="basicBadge">Basic</span>
                    </div>

                    <div className="affordHead">Basic Users</div>
                    <div className="affordSubHead">
                      {/* <p><strong>Free</strong> / Forever</p> */}
                      Free/Forever
                    </div>
                    <div className="affordList">
                      <ul className="basic-checklist ">
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Add up to 40 listings.</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            {" "}
                            Add up to 5 images to each listing.
                          </div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Messaging.</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Shipping profiles.</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Social Media sharing.</div>
                        </li>
                      </ul>

                      <span>
                        * On each sale, we charge 10% plus 10 cents (for
                        products) or 20% plus 20 cents (for services).
                      </span>
                      <Popover content={contentBasic} trigger="click">
                        <a className="seeMore">See more...</a>
                      </Popover>
                      <Button className="btnAfford">Try for Free</Button>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInDown proUser"
                    data-wow-duration="3s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon ribbon-top-right proRibbon">
                      <span className="proBadge">PRO</span>
                    </div>
                    <div className="affordHead">PRO Users </div>
                    <div className="affordSubHead">$4.95/YEAR</div>
                    <div className="affordList">
                      <ul className="cgreen-checklist">
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            Everything for Basic Users.
                          </div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            Add up to 300 listings (or maybe unlimited if we
                            don’t have any 3rd package right now).
                          </div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            Access to Live Auctions.
                          </div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            Pro Badge on all listings.
                          </div>
                        </li>
                      </ul>
                      <span>
                        * On each sale, we charge 10% plus 10 cents (for
                        products) or 20% plus 20 cents (for services).
                      </span>
                      <Popover content={proUser} trigger="click">
                        <a className="seeMore">See more...</a>
                      </Popover>
                      <Button>Subscribe to Pro</Button>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInUp goldUser"
                    data-wow-duration="3s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon ribbon-top-right goldRibbon">
                      <span className="goldBadge">Gold</span>
                    </div>
                    <div className="affordHead">Gold Users </div>
                    <div className="affordSubHead">$7.95/YEAR</div>
                    <div className="affordList">
                      <ul className="y-checklist">
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Gold badge</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Unlimited Listings.</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">
                            Blog (with 5-10 items for promotion).
                          </div>
                        </li>
                      </ul>
                      <span>
                        * On each sale, we charge 10% plus 10 cents (for
                        products) or 20% plus 20 cents (for services).
                      </span>
                      <Button>Subscribe to Gold </Button>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    className="blockcmn wow bounceInLeft platinaUser"
                    data-wow-duration="4s"
                    data-wow-delay="0.3s"
                  >
                    <div class="ribbon ribbon-top-right silverRibbon">
                      <span className="platinumBadge">PLATINUM</span>
                    </div>
                    <div className="affordHead">Platinum Users</div>
                    <div className="affordSubHead">$9.95/YEAR</div>
                    <div className="affordList">
                      <ul className="greychecklist">
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Coming soon</div>
                        </li>
                        <li>
                          <div className="checkk">
                            <span class="dot">
                              <img src={require("../imgs/tick.png")} />
                            </span>
                          </div>
                          <div className="dotText">Wholesale</div>
                        </li>
                      </ul>
                      <span>
                        * On each sale, we charge 10% plus 10 cents (for
                        products) or 20% plus 20 cents (for services).
                      </span>
                      <Button>Coming Soon</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            {/* End Affordable pricing */}

            <div className="container-fluid container howGetStartNew">
              <div className="headSec text-center getstart-head">
                <h2
                  className="wow slideInLeft"
                  data-wow-duration="4s"
                  data-wow-delay="0.3s"
                >
                  How to Get Started
                </h2>
              </div>
              <Row className="FeaturedProductSec RecentJobsSec comnSec getstart">
                <Col span={8}>
                  <div
                    className="block blk1 wow slideInLeft"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imgWrap ">
                      <img src={`${require("../imgs/getstart3.png")}`} />
                    </div>
                    <h3 className="txt">
                      <img src={`${require("../imgs/Vector.png")}`} />
                      Choose a Plan
                    </h3>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="block blk2 wow bounceInDown center"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imgWrap ">
                      <img src={`${require("../imgs/getstart2.png")}`} />
                    </div>
                    <h3 className="txt">
                      <img src={`${require("../imgs/Vector.png")}`} />
                      Sign Up
                    </h3>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className="block blk3 wow slideInRight"
                    data-wow-duration="2s"
                    data-wow-delay="0.3s"
                  >
                    <div className="imgWrap ">
                      <img src={`${require("../imgs/getstart1.png")}`} />
                    </div>
                    <h3 className="txt">
                      <img src={`${require("../imgs/Vector.png")}`} />
                      Get Access
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="container-fluid container downloadAppNew">
              <Row className="comnSec mobSec">
                <Col span={8}>
                  <img
                    className="wow slideInLeft"
                    src={`${require("../imgs/mobile.png")}`}
                  />
                </Col>
                <Col span={8}>
                  <div className="blockcmn">
                    <h5>Download our App</h5>
                    <div className="d-flex">
                      <img
                        className="wow slideInLeft"
                        src={`${require("../imgs/googlplaystore.png")}`}
                      />
                      <img
                        className="wow slideInRight"
                        src={`${require("../imgs/iphoneplaystore.png")}`}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="container-fluid container newsSletterNew">
              <div className="newssletter getstart-head">
                <h3
                  className="wow slideInLeft"
                  data-wow-duration="2s"
                  data-wow-delay="0.3s"
                >
                  Subscribe to Our Newsletter
                </h3>
              </div>
              <div
                className="emailsec comnSec wow slideInRight"
                data-wow-duration="2s"
                data-wow-delay="0.3s"
              >
                {/* <Input placeholder="Username" /> */}

                <Input
                  placeholder="Enter your email here..."
                  prefix={<span className="sendIcon" />}
                />
                {/* <a className="send"><img src={`${require("../../../src/imgs/Icon_social.png")}`}/></a> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.AllCatagoryReducer.catagoryState,
    featureListings: state.FeaturedListing,
    popularListings: state.PopularListing.popularListing.data,
    customMade: state.CustomMadeJobReducer.customMadeState,
    exclusiveServiced: state.exclusiveServices.exclusiveData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allCatagoryAction: () => dispatch(allCatagoryAction()),
    exclusiveServices: () => dispatch(exclusiveService()),
    featureListing: () => dispatch(featureListing()),
    customMadeJobs: () => dispatch(customMadeJobs()),
    popularListing: () => dispatch(popularListing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageView);
