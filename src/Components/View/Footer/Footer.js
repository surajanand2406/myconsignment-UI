import React, { Component } from "react";
import "./Footer.scss";
import { InstagramOutlined, WhatsAppOutlined} from '@ant-design/icons';
import {   Row, Col  } from 'antd';

export class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid footer"> 
                <Row className="comnSec container">
                <Col className="footerContent">
                    <div className="blockcmn">
                      <span className="footerHeading">
                      <a><img className="logoFooter"  src={`${require("../imgs/logo.png")}`}/></a>
                      </span>
                         <ul>
                           <li>Follow us on :</li>
                           <li className="social-link"> 
                           {/* <a><InstagramOutlined /></a><a><WhatsAppOutlined /></a>  */}
                          <a><img className="fImaged"  src={`${require("../imgs/face.png")}`}/></a>
                          <a><img className="fImaged" src={`${require("../imgs/pin.png")}`}/></a>
                          <a><img className="fImaged" src={`${require("../imgs/twit.png")}`}/></a> 
                          <a><img className="fImaged" src={`${require("../imgs/insta.jpeg")}`}/></a> 

                           </li>
                         </ul>
                    </div>
                </Col>
                <Col className="footerContent">
                <div className="blockcmn">
                <span className="footerHeading">
                About Us
                  </span>
                <ul>
                           <li><a>Our Community</a></li>
                           <li></li>
                         </ul>
                </div>
                </Col>
                <Col className="footerContent">
                <div className="blockcmn">
                <span className="footerHeading">
                  Quick Links
                  </span>
                <ul>
                           <li><a>Live Auctions</a></li>
                           <li><a>Custom Made</a></li>
                           <li><a>Exclusive Services</a></li>
                           <li><a>Sponsorship</a></li>
                           <li><a>Blog</a></li>
                         </ul>
                </div>
                </Col>
                <Col className="footerContent">
                <div className="blockcmn">
                <span className="footerHeading">
                  Apps
                  </span>
                <ul>
                           <li><a>Pure Artisan</a></li>
                           <li><a>The Trading Post</a></li>
                         </ul>
                </div>
                </Col>
                <Col className="footerContent">
                <div className="blockcmn">
                <span className="footerHeading">
                  Support
                  </span>
                <ul>
                           <li><a>Help</a></li>
                           <li><a>FAQs</a></li>
                           <li><a>Privacy Policy</a></li>
                           <li><a>Term Of Service</a></li>
                           <li><a>Contact Us</a></li>
                         </ul>
                </div>
                </Col>
                </Row>
                <Row className="btmFooter container">
                  <Col><span className="copyRyt">© Copyright,  2020</span></Col>
                  <Col className="sposers">
                  <a><img className="fImage"  src={`${require("../imgs/p.png")}`}/></a>
                    <a><img className="fImage" src={`${require("../imgs/a.png")}`}/></a>
                    <a><img className="fImage" src={`${require("../imgs/st.png")}`}/></a>
                    <a><img className="fImage" src={`${require("../imgs/v.png")}`}/></a>
                    <a><img className="fImage"  src={`${require("../imgs/m.png")}`}/></a>
                    <a><img className="fImage"  src={`${require("../imgs/disc.png")}`}/></a>
                    {/* <a><img src={`${require("../imgs/paypal.jpeg")}`}/></a> */}
                  </Col>
                 </Row>
        </div>
      </div>
    );
  }
}

export default Footer;
