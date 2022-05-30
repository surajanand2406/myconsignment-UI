import React from "react";
import { Card } from "antd";
import ReactHLS from "react-hls";
import { Link } from "react-router-dom";
import useWindowDimensions from "./dimentions";
import { SocketIOProvider, useSocket } from "use-socketio";

export default function LiveVideo(props) {
  const { auctionID } = props;
  const [auction, setAuction] = React.useState(null);
  const { height, width } = useWindowDimensions();
  const { socket, subscribe, unsubscribe } = useSocket("startAuction" + auctionID, data => {
    if (data.doc.status === 1) {
      setAuction(data.doc);
    }
  })

  if (auction === null) {
    return "loading desu";
  } else {
    if (auction.playBackId && width <= 800) {
      return (
        <Card>
          <ReactHLS
            url={"https://stream.mux.com/" + auction.playBackId + ".m3u8"}
            autoplay={true}
            height={170}
            width={"100%"}
          />
        </Card>
      );
    } else {
      return (
        <Card
          className={
            "m_3 text_center"
            // (" display_none")
          }
          style={{overflow: "hidden"}}
        >
          {auction.playBackId ? (
            <ReactHLS
              url={"https://stream.mux.com/" + auction.playBackId + ".m3u8"}
              autoplay={true}
              height={250}
              width={"auto"}
            />
          ) : (
            <img
              src={auction.image}
              height={250}
              width={"auto"}
            />
          )}

          {width <= 800 && (
            <h4>
              <Link to={`/auctionCatalogue/${auction._id}`}>
                {auction.title}
              </Link>
            </h4>
          )}
        </Card>
      );
    }
  }
}
