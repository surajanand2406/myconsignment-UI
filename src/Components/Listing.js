import React, { PureComponent } from "react";
import { Input, Button } from "antd";

class Listing extends PureComponent {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Button type="button" className="btn btn-lg btn-success">Filter Seller Products</Button>
            <div className=" side-list">
              <h1>Category</h1>
              <div className="spa"><a>Suits(433)</a></div>
              <div className="spa"><a>Shirts(453)</a></div>
              <div className="spa"><a>Trousers(345)</a></div>
              <div className="spa"><a>Wedding(434)</a></div>
              <div className="spa"><a>Jackets(333)</a></div>
              <h3 style="padding-top: 30px;">PRICE</h3>
              <div className="slidecontainer">
                <Input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
              </div>
              <ul>
                <li><h3>Color</h3></li>
                <li>Black</li>
                <li>Orange</li>
                <li>Blue</li>
                <li>Brown</li>
                <li>Dark Green</li>
              </ul>

              <ul>
                <li><h3>Type</h3></li>
                <li>Orange</li>
                <li>Single Brasslet</li>
                <li>Madridhgl</li>
                <li>Todraruh Style</li>
                <li>Dark Green</li>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="listing">
              <div className="spa"><a>Shamsue Product Store</a></div>
              <div className="spa"><a>Show 12 per page</a></div>
              <div className="spa"><a>Sort by Popularity</a></div>
              <div className="spa"><a>View your choice</a></div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="row">
                  <div className="col-2">
                    <img src="../../../assets/images/suit.webp" style={{width: '150px', height: '230px'}} /> 
                  </div>
                  <div className="col-10">
                    <div className="card-body">
                      <h3 className="card-title">Net Streched Suit <span style={{color: '#d3d011', fontWeight: '500px'}}>${{ price }}</span><i className="bi bi-arrow-left-right" style={{paddingLeft: '400px'}}></i>&nbsp;&nbsp;&nbsp;<i className="bi bi-heart-fill blue-color"></i></h3>
                      <span className="card-description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, iste totam temporibus consequuntur autem repudiandae tempora. Consectetur, aperiam rerum minima voluptates iste enim tempora, magni eaque atque est accusantium vero?
                      </span>
                      <span>
                        <h3 style="padding-top: 20px;">Size {{ size }}</h3>
                        <button type="button" className="btn btn-success btn-circle">ADD TO CART</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="row">
                  <div className="col-2">
                    <img src="../../../assets/images/suit.webp" style={{width: '150px', height: '230px' }} />
                  </div>
                  <div className="col-10">
                    <div className="card-body">
                      <h3 className="card-title">Net Streched Suit <span style="color: #d3d011; font-weight: 500px;">${{ price }}</span><i className="bi bi-arrow-left-right" style={{paddingLeft: '400px'}}></i>&nbsp;&nbsp;&nbsp;<i className="bi bi-heart-fill blue-color"></i></h3>
                      <span className="card-description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, iste totam temporibus consequuntur autem repudiandae tempora. Consectetur, aperiam rerum minima voluptates iste enim tempora, magni eaque atque est accusantium vero?
                      </span>
                      <span>
                        <h3 style={{paddingTop: '20px'}}>Size {{ size }}</h3>
                        <Button type="button" className="btn btn-success btn-circle">ADD TO CART</Button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="row">
                  <div className="col-2">
                    <img src="../../../assets/images/suit.webp" style={{width: '150px', height: '230px'}}/>
                  </div>
                  <div className="col-10">
                    <div className="card-body">
                      <h3 className="card-title">Net Streched Suit <span style="color: #d3d011; font-weight: 500px;">${{ price }}</span><i className="bi bi-arrow-left-right" style={{paddingLeft: '400px'}}></i>&nbsp;&nbsp;&nbsp;<i className="bi bi-heart-fill blue-color"></i></h3>
                      <span className="card-description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, iste totam temporibus consequuntur autem repudiandae tempora. Consectetur, aperiam rerum minima voluptates iste enim tempora, magni eaque atque est accusantium vero?
                      </span>
                      <span>
                        <h3 style="padding-top: 20px;">Size {{ size }}</h3>
                        <button type="button" className="btn btn-success btn-circle">ADD TO CART</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Listing;