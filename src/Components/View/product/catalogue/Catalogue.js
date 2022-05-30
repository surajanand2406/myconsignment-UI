import React, { PureComponent } from 'react'
import { Slider, Divider, Checkbox, Tree, Carousel, Select, Button, Row, Col } from 'antd';
import { DownOutlined, HeartOutlined, StarFilled, ArrowRightOutlined} from '@ant-design/icons';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import "./catalogue.scss";
import Footer from "../../Footer/Footer";
import HeaderView from "../../Header/Header";
// import "../../HomePage/homepage.scss"
import feature4 from "../../imgs/feature4.png";
import feature1 from "../../imgs/feature1.png";
import feature2 from "../../imgs/feature2.png";
import feature3 from "../../imgs/feature3.png";

const { Option } = Select;
const children = [];
const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined />
        }]}]
class Catalogue extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
      handleChange=(value) =>{
        console.log(`Selected: ${value}`);
      }
    render() {
        return (
            <div className="productStoreMain">
                <HeaderView />
            <div className=" productStore container">
                <div className="leftStore">
                    <div className="filterSeller">
                        <span className="filterHead">Filter</span>
                        <div className="catagry">
                           <h3> Category</h3>
                            <ul>
                                <li><a>suits{" "}(433)</a></li>
                                <li><a>shirts{" "}(453)</a></li>
                                <li><a>trousers{" "}(345)</a></li>
                                <li><a>wedding{" "}(234)</a></li>
                                <li><a>jackets{" "}(333)</a></li>
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
                                <li className="blckcheck"><Checkbox  defaultChecked={false}  className="colorCheck" />Black</li>
                                <li className="orgcheck"><Checkbox  defaultChecked={false}  className="colorCheck" />Orange</li>
                                <li className="blueheck" ><Checkbox defaultChecked={false}  className="colorCheck" />Blue</li>
                                <li  className="browncheck"><Checkbox defaultChecked={false}  className="colorCheck" />Brown</li>
                                <li className="greencheck"><Checkbox  defaultChecked={false}  className="colorCheck" />Desk green</li>
                            </ul>
                    </div>

                    {/*  */}
                    <Divider orientation="right" plain></Divider>
                    <div className="colorItem">
                        <h3>TYPE</h3>
                    <ul>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />Single Breasted</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />Mandarin</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />Todexdo Style</li>
                            </ul>
                    </div>
                    <Divider orientation="right" plain></Divider>
                    <div className="colorItem">
                        <h3>SIZE</h3>
                    <ul>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />XXS</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />XS</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />S</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />M</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />L</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />XL</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />XXL</li>
                                <li><Checkbox defaultChecked={false}  className="colorCheck" />XXXL</li>
                            </ul>
                    </div>
                </div>
                <div className="rightStore">
                     <div className="carousalAdd">
                        <Carousel >
                            <div className="bannerImage comonBlk">
                             <div className="banneContent">
                                 <h2>Get <br/>50% OFF</h2>
                                 <p>Some gorgiouse content goes here</p>
                             </div>
                            </div>
                            <div className="bannerImage2 comonBlk">
                            <h3 className="addNews">2</h3>
                            </div>
                            <div className="bannerImage3 comonBlk">
                            <h3 className="addNews"> 3</h3>
                            </div> 
                        </Carousel>
                     </div>

                    <div className="allItemList">
                    <div className="storeName">
                        <div className="storeUser">
                        <h3>Handicraft's</h3>
                        </div>
                        <div className="storeChoice">
                        <div className="storeDropdown">
                            <span className="ldropdownlabel">Show</span>
                        <Select  size={"small"} defaultValue="20 per page" onChange={this.handleChange} style={{ width: 200 }}>
                        <Option value="20"> 20 per page</Option>
                        <Option value="50"> 50 per page</Option>
                        <Option value="100"> 100 per page</Option>
                        <Option value="all"> All    </Option>
                        </Select>
                        </div>
                        <div className="storeDropdown">
                            <span className="ldropdownlabel">Sort by</span>
                        <Select  size={"small"} defaultValue="Popularity" onChange={this.handleChange} style={{ width: 200 }}>
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


                    <div className="itemClothing">
                    <Row className="FeaturedProductSec comnSec">
                <Col span={8}>
                    <div className="blockcmn">
                        <div className="imgsmallFeature">
                        <img src={feature1}/>
                        </div>
                        <div className="textSec">
                            <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                            <h3>$13.95</h3>
                            <span>Eligible for Shipping To Mars or somewhere else</span>
                            <div className="ftrsec">
                               <div className="left">
                               <StarFilled />
                               <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <span className="rating">4.87</span>
                                </div> 
                                <div className="right">
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <HeartOutlined />
                                </Button>
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <img src={require("../../imgs/cart.png")} />
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature2}/>
                    </div>
                <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature3}/>
                    </div>
                    <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                
                <Col span={8}>
                    <div className="blockcmn">
                        <div className="imgsmallFeature">
                        <img src={feature1}/>
                        </div>
                        <div className="textSec">
                            <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                            <h3>$13.95</h3>
                            <span>Eligible for Shipping To Mars or somewhere else</span>
                            <div className="ftrsec">
                               <div className="left">
                               <StarFilled />
                               <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <span className="rating">4.87</span>
                                </div> 
                                <div className="right">
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <HeartOutlined />
                                </Button>
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <img src={require("../../imgs/cart.png")} />
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature2}/>
                    </div>
                <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature3}/>
                    </div>
                    <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                
                <Col span={8}>
                    <div className="blockcmn">
                        <div className="imgsmallFeature">
                        <img src={feature1}/>
                        </div>
                        <div className="textSec">
                            <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                            <h3>$13.95</h3>
                            <span>Eligible for Shipping To Mars or somewhere else</span>
                            <div className="ftrsec">
                               <div className="left">
                               <StarFilled />
                               <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <span className="rating">4.87</span>
                                </div> 
                                <div className="right">
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <HeartOutlined />
                                </Button>
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <img src={require("../../imgs/cart.png")} />
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature2}/>
                    </div>
                <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature3}/>
                    </div>
                    <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                
                <Col span={8}>
                    <div className="blockcmn">
                        <div className="imgsmallFeature">
                        <img src={feature1}/>
                        </div>
                        <div className="textSec">
                            <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                            <h3>$13.95</h3>
                            <span>Eligible for Shipping To Mars or somewhere else</span>
                            <div className="ftrsec">
                               <div className="left">
                               <StarFilled />
                               <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                <span className="rating">4.87</span>
                                </div> 
                                <div className="right">
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <HeartOutlined />
                                </Button>
                                <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                                <img src={require("../../imgs/cart.png")} />
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature2}/>
                    </div>
                <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                <Col span={8}>
                <div className="blockcmn">
                <div className="imgsmallFeature">
                    <img src={feature3}/>
                    </div>
                    <div className="textSec">
                    <p>Lee Pucker design. Leather botinki for handsome designers. Free shipping.</p>
                    <h3>$13.95</h3>
                    <span>Eligible for Shipping To Mars or somewhere else</span>
                    <div className="ftrsec">
                        <div className="left">
                        <StarFilled />
                        <StarFilled /><StarFilled /><StarFilled /><StarFilled />
                        <span className="rating">4.87</span>
                        </div> 
                        <div className="right">
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <HeartOutlined />
                        </Button>
                        <Button type="primary" shape="round" size={"Small"} className="heartbtn">
                        <img src={require("../../imgs/cart.png")} />
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
                </Col>
                
                
                </Row>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default Catalogue