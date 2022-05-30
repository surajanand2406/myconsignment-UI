import React from "react";
import Navbar from "../Navbar";
import { Row, Col, List, Card, Button } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import { Link } from "react-router-dom";
import useWindowDimensions from "./dimentions";
var userData = null
export default function AuctionDashboard(props) {
  const [user] = React.useState(JSON.parse(localStorage.getItem("userData")));

  const [itemList, setItemList] = React.useState([]);
  const { height, width } = useWindowDimensions();

  React.useEffect(() => {
   if(user!==null){
    fetch(url + "/api/getItemsWon?id=" + user._id)
    .then(res => res.json())
    .then(data => {
      console.log(data.doc);
      setItemList(data.doc);
    });
   }
  }, []);

  return (
    <div>
      <Navbar />
      <Row style={{ margin: 10 }}>
        <Col
          xs={width > 800 ? 16 : 24}
          sm={width > 800 ? 16 : 24}
          md={width > 800 ? 16 : 24}
          lg={width > 800 ? 16 : 24}
          xl={width > 800 ? 16 : 24}
        >
          <div style={{ padding: 5 }}>
            <List
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5
              }}
              header={
                <div style={{ padding: 5 }}>
                  <h2>Pending Payments</h2>
                </div>
              }
              bordered
              dataSource={itemList ? itemList : []}
              renderItem={(item, index) => (
                <Card style={{ width: "100%", margin: 0, padding: 0 }}>
                  <Row className="mp_0">
                    <Col
                      className="mp_0"
                      xs={16}
                      sm={16}
                      md={16}
                      lg={16}
                      xl={16}
                    >
                      <h3 className="mp_0">
                        <Link to={`/auctionCatalogue/${item._id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mp_0 we_500">By Op</p>
                    </Col>
                    <Col className="mp_0" xs={8} sm={8} md={8} lg={8} xl={8}>
                      <Button
                        type="primary"
                        className="m_3"
                        block
                        style={{
                          backgroundColor: "#FFC439",
                          borderColor: "#FFC439"
                        }}
                      >
                        Paypal
                      </Button>
                      <Button
                        type="primary"
                        className="m_3"
                        block
                        style={{ backgroundColor: "#4650FF" }}
                      >
                        Stripe
                      </Button>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          </div>
        </Col>
        <Col
          xs={width > 800 ? 8 : 24}
          sm={width > 800 ? 8 : 24}
          md={width > 800 ? 8 : 24}
          lg={width > 800 ? 8 : 24}
          xl={width > 800 ? 8 : 24}
        >
          <div style={{ padding: 5 }}>
            <List
              header={
                <div style={{ padding: 5 }}>
                  <h2>Payments Made</h2>
                </div>
              }
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5
              }}
              bordered
              dataSource={itemList ? itemList : []}
              renderItem={(item, index) => (
                <Card style={{ width: "100%", margin: 0, padding: 0 }}>
                  <Row className="mp_0">
                    <Col
                      className="mp_0"
                      xs={16}
                      sm={16}
                      md={16}
                      lg={16}
                      xl={16}
                    >
                      <h3 className="mp_0">
                        <Link to={`/auctionCatalogue/${item._id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mp_0 we_500">By {}</p>
                    </Col>
                    <Col className="mp_0" xs={8} sm={8} md={8} lg={8} xl={8}>
                      <Button type="primary" className="m_3" block>
                        Details
                      </Button>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
