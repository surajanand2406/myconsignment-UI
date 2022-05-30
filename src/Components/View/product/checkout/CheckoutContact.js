/** @format */

import React, { Component } from "react";
import { Radio, Row, Col } from "antd";
import "./Checkout.scss";

class CheckoutContacts extends Component {
  render() {
    return (
      <>
        <div className="checkoutContact">
          <div className="deliveryMothod">
            <h2>Delivery method</h2>
            <Row>
              <Col slan={12} className="lftBlock">
                <Radio>
                  Title
                  <br />
                  Discription
                </Radio>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}
export default CheckoutContacts;
