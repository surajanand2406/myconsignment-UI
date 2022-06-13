/** @format */

import React, { PureComponent } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { Icon } from "@ant-design/compatible";
import "./LoginSignup.scss";
import { Link } from "react-router-dom";


class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onFinish = (values) => {
    console.log("SuccessXXX:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="login">
        <div className="loginLeft">
          <h2>
            <span className="greentxt">Welcome to,</span> <br />
            <div className="logowrap">
              <img
                className="loginLogo"
                src={`${require("../imgs/logo.png")}`}
              />
            </div>
          </h2>
          <p className="desclogin">
            MyConsignment is an international E-commerce site that specializes
            in buying/selling products from all over the world. MyConsignment is
            mainly aimed at wholesale buyers rather than regular consumers.
          </p>
          <span className="smalltxt">
            shipping is available around the world.
          </span>
        </div>
        <div className="loginRight">
          <div className="site-card-border-less-wrapper">
            <Card bordered={false} style={{ width: 300 }}>
              <div className="logowrap">
                <img
                  className="loginLogo"
                  src={`${require("../imgs/logo.png")}`}
                />
              </div>
              <p className="logodesc">Welcome, please log into your account</p>
              <div className="loginfrm">
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    label="Username or Email"
                    name="Username"
                    placeholder="Enter your username or email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username or Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Link className="forgetPassword">Forgot Password?</Link>
                  <div className="term_condation">
                    <Checkbox>
                      Do you agree with our <Link> User Agreement</Link> and{" "}
                      <Link> Our Terms and Conditions</Link> ?
                    </Checkbox>
                  </div>

                  <Button type="primary" htmlType="submit" className="comnBtn">
                    Log In <img src={`${require("../imgs/arrow.png")}`} />
                  </Button>
                </Form>
              </div>
              <div className="signupOption">
                <p className="continuewrap">
                  <span className="continuewith">OR</span>
                </p>
                <Button type="primary" className="comnBtn sign">
                  Register
                  <img src={`${require("../imgs/arrow.png")}`} />
                </Button>
              </div>
              <p className="social">
                <a className="fb">
                  <img src={`${require("../imgs/fb.png")}`} />
                  {/* <Icon type="facebook" /> */}
                  Facebook
                </a>
                OR
                <a className="google1">
                  <img src={`${require("../imgs/google1.png")}`} />
                  {/* <Icon type="google" /> */}
                  Google
                </a>
              </p>

              <div></div>
              <div></div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
