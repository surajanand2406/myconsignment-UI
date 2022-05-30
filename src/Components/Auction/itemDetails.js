import React from "react";
import Navbar from "../Navbar";
import { Row, Col, List, Card } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import useWindowDimensions from "./dimentions";

export default function ItemDetails(props) {
  const [itemList, setItemList] = React.useState([]);
  const [item, setItem] = React.useState({});
  const [auction, setAuction] = React.useState({});
  const { height, width } = useWindowDimensions();

  React.useEffect(() => {
    fetch(
      url +
        "/api/getItems?id=" +
        props.match.params.auctionID +
        "&used=" +
        false
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.doc);
        setItemList(data.doc);
      });

    fetch(url + "/api/getAuction?id=" + props.match.params.auctionID)
      .then(res => res.json())
      .then(data => {
        console.log(data.doc);
        setAuction(data.doc);
      });
    fetch(url + "/api/getItemById?id=" + props.match.params.itemID)
      .then(res => res.json())
      .then(data => {
        console.log(data.doc);
        setItem(data.doc);
      });
  }, []);

  if (auction.title) {
    return (
      <div>
        <Navbar />
        <Row style={{ margin: 10 }}>
          <Col
            xs={width >= 640 ? 16 : 24}
            sm={width >= 640 ? 16 : 24}
            md={width >= 640 ? 16 : 24}
            lg={width >= 640 ? 16 : 24}
            xl={width >= 640 ? 16 : 24}
          >
            <Card className="m_3">
              <Carousel showThumbs={false} autoPlay showIndicators infiniteLoop>
                {item.images &&
                  item.images.map((v, i) => {
                    return (
                      <div key={i}>
                        <img
                          src={v.path}
                          style={{
                            height: "250px",
                            width: "auto",
                            overflow: "hidden"
                          }}
                        />
                      </div>
                    );
                  })}
              </Carousel>
              <h2 className="mp_0">
                <a href="#">{item.title}</a>
              </h2>
              <h3 className="mp_0">
                <a href="#">
                  <b>By {auction.title}</b>
                </a>
              </h3>
              <p className="mp_0 m_3">{item.description}</p>
            </Card>
          </Col>
          {/* { && ( */}

          <Col
            xs={width >= 640 ? 8 : 24}
            sm={width >= 640 ? 8 : 24}
            md={width >= 640 ? 8 : 24}
            lg={width >= 640 ? 8 : 24}
            xl={width >= 640 ? 8 : 24}
          >
            {/* <Card className="m_3 text_center">
  <img
    src={auction.image}
    style={{
      height: "200px",
      width: "auto",
      overflow: "hidden"
    }}
  />
  <h4>
    <Link to={`/auctionCatalogue/${auction._id}`}>
      {auction.title}
    </Link>
  </h4>
</Card> */}
            {/* <Card className="m_3"> */}
            <div style={{ margin: 5 }}>
              <List
                header={
                  <div className="text_center">
                    <h3>All Items By {auction.title}</h3>
                  </div>
                }
                bordered
                dataSource={itemList}
                renderItem={(v, index) => (
                  <List.Item>
                    <Row className=" width_100">
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <img
                          src={v.images[0] && v.images[0].path}
                          style={{
                            height: "70px",
                            width: "auto",
                            overflow: "hidden"
                          }}
                        />
                      </Col>

                      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <h3 className="mp_0">
                          <a href="#">Lot # {index + 1}</a>
                        </h3>
                        <a
                          href={`/item/${props.match.params.auctionID}/${v._id}`}
                        >
                          {v.title}
                        </a>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </div>
            {/* </Card> */}
          </Col>

          {/* )} */}
        </Row>
      </div>
    );
  } else {
    return "Loading ...";
  }
}
