/** @format */

import React, { PureComponent } from "react";
import CheckoutContacts from "./CheckoutContact";
import "./Checkout.scss";
import { Steps, Button, message, Col, Row } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <CheckoutContacts />,
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
class CheckoutPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="checkout container">
        <Row className="blkRow">
          <Col span={12} className="leftBlk">
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Col>
          <Col span={12} className="leftBlk">
            <div className="head">
              <h3>Order total (N)</h3>
              <a href="#">Edit</a>
            </div>
            <div className="bodySec">
              <Row>
                <Col slan={12} className="lftBlock">
                  <div className="imgBlock">
                    <img src={require("../../imgs/Blockimg.png")} alt="img" />
                  </div>
                  <h4>Name</h4>
                  <p>
                    <span>+</span>N<span>-</span>
                  </p>
                </Col>
                <Col slan={12} className="rgtBlock">
                  <h4>Price</h4>
                </Col>
              </Row>
              <ul className="priceList">
                <li>
                  {" "}
                  Text<span>Price</span>
                </li>
                <li>
                  {" "}
                  Text<span>Price</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CheckoutPage;
