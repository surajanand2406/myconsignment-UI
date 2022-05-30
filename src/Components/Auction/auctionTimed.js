import React from "react";
import Navbar from "../Navbar";
import { Row, Col } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import io from "socket.io-client";
import axios from "axios";
import mockUser from "./mockUser";
import AuctionDetails from "./auctionDetailsTimed";
import LiveVideo from "./liveVideo";
import useWindowDimensions from "./dimentions";
import { SocketIOProvider, useSocket } from "use-socketio";


function AuctionTimed(props) {
  let auctionID = props.match.params.auctionID;
  const { height, width } = useWindowDimensions();

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
          {width <= 800 && (
            <>
              <LiveVideo auctionID={auctionID} />
            </>
          )}
          <AuctionDetails {...props} />
        
        </Col>
        {width > 800 && (
          <>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <LiveVideo auctionID={auctionID} />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}




export default function AuctionConfigTimed(props) {
  let auctionID = props.match.params.auctionID;
  console.log(":rerender")
  return (
    <SocketIOProvider url={url} opts={{query: {
      auctionID
    }}}>
      <AuctionTimed {...props}/>
    </SocketIOProvider>
  );
}