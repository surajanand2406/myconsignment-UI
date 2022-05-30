import React from "react";
import Navbar from "../Navbar";
import { Row, Col } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuctionDetails from "./auctionDetails";
import LiveVideo from "./liveVideo";
import LiveChat from "./liveChat";
import useWindowDimensions from "./dimentions";
import { SocketIOProvider } from "use-socketio";
import QuickMessages from "./quickMessages";

function AuctionLive(props) {
  let auctionID = props.match.params.auctionID;
  const { height, width } = useWindowDimensions();

  return (
    <div>
      <Navbar />
      <Row style={{ margin: 10 }}>
        <Col
          xs={width > 800 ? 8 : 24}
          sm={width > 800 ? 8 : 24}
          md={width > 800 ? 8 : 24}
          lg={width > 800 ? 8 : 24}
          xl={width > 800 ? 8 : 24}
        >
          {width <= 800 && (
            <>
              <LiveVideo auctionID={auctionID} />
              <QuickMessages auctionID={auctionID} />
            </>
          )}
          <AuctionDetails {...props} />
          {width <= 800 && (
            <>
              <LiveChat auctionID={auctionID} />
            </>
          )}
        </Col>
        {width > 800 && (
          <Col xs={16} sm={16} md={16} lg={16} xl={16}>
            <LiveVideo auctionID={auctionID} />
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <QuickMessages auctionID={auctionID} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <LiveChat auctionID={auctionID} />
              </Col>
            </Row>
          </Col>
        )}

        {/* {width > 800 && (
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <LiveChat auctionID={auctionID} />f
          </Col>
        )} */}
      </Row>
    </div>
  );
}

export default function AuctionConfig(props) {
  let auctionID = props.match.params.auctionID;
  return (
    <SocketIOProvider
      url={url}
      opts={{
        query: {
          auctionID
        }
      }}
    >
      <AuctionLive {...props} />
    </SocketIOProvider>
  );
}
