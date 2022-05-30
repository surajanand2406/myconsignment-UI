import React from "react";
import { Card, Button, Input } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { SocketIOProvider, useSocket } from "use-socketio";
// var userData = null;
export default function AuctionDetails(props) {
  const [user] = React.useState(JSON.parse(localStorage.getItem("userData")));

  // const { socket } = props;
  let auctionID = props.match.params.auctionID;
  const [auction, setAuction] = React.useState({});
  // const [user, setUser] = React.useState(true);
  const [bid, setBid] = React.useState(0);
  const [timeOut, setTimeOut] = React.useState(500 * 1000);
  const { socket, subscribe, unsubscribe } = useSocket(
    "timer" + auctionID,
    function(data) {
      console.log("des", data);
    }
  );
  const [userCount, setUserCount] = React.useState(0);
  const [warning, setWarning] = React.useState("");
  const [item, setItem] = React.useState({
    images: [],
    title: "Loading...",
    startingBid: "Loading..."
  });
  React.useEffect(() => {
    emitDemo(auctionID);
    emitItem(auctionID);

    // setTimeout(() => {
    //   emitClose();
    // }, timeOut);
    socket.on("startAuction" + auctionID, data => {
      if (data.doc.status === 1) {
        setAuction(data.doc);
      } else {
        props.history.replace("/auction");
      }
      console.log(data.doc, "auction detaisl");
    });

    socket.on("warning" + auctionID, function(data) {
      setWarning("Item is About To close");
      // console.log(data.doc, "auction detaisl");
    });

    socket.on("item" + auctionID, function(data) {
      console.log("des");
      data.doc ? updateData(data.doc) : emitClose();
    });
    socket.on("count" + auctionID, data => {
      console.log("user Count" + data);
      setUserCount(data.count);
    });

    socket.emit("count" + auctionID, "ok");
  }, []);

  function updateData(val) {
    setItem({
      ...val
    });

    setTimeOut(500 * 1000);
  }

  function emitDemo(data) {
    // alert(JSON.stringify(auctionID))
    socket.emit("start" + auctionID, auctionID);
  }

  async function emitItem(id) {
    // alert(JSON.stringify(auctionID))

    const data = new FormData();
    data.append("title", item.title);
    data.append("description", item.description);
    data.append("startingBid", item.startingBid);
    data.append("update", true);
    data.append("used", true);
    data.append("_id", item._id);
    data.append("auctionID", auctionID);

    if (item._id) {
      axios
        .post(url + "/api/updateItemLive", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          socket.emit("itemDetails" + auctionID, auctionID);
        })
        .catch(function(error) {
          throw error;
        });
      return;
    }

    socket.emit("itemDetails" + auctionID, auctionID);
  }

  function emitClose() {
    axios
      .post(url + "/api/updateAuctionLive", {
        status: 0,
        _id: auctionID
      })
      .then(response => {
        socket.emit("start" + auctionID, auctionID);
      });
  }

  function emitBid(auto, value) {
    let bid_fin = bid;

    if (auto) {
      bid_fin =
        value + parseInt(item.finalBid ? item.finalBid.bid : item.startingBid);
      console.log(bid_fin, value);
    }

    if (
      bid_fin > parseInt(item.finalBid ? item.finalBid.bid : item.startingBid)
    ) {
      if (user !== null) {
        axios
          .post(url + "/api/updateItemLive", {
            _id: item._id,
            finalBid: {
              bid: bid_fin,
              userId: user._id,
              close: false
            }
          })
          .then(response => {
            // console.log(response.data.doc)
            socket.emit("itemDetails" + auctionID, auctionID);
          });
      }
    } else {
      alert("please enter a valid bid");
    }
  }

  return (
    <Card
      className="m_3"
      style={{ height: "85vh", overFlow: "hidden", overflowY: "scroll" }}
    >
      <h3 className="mp_0">
        <i>Users Watching :</i> <b>{userCount}</b>
      </h3>
      <Carousel showThumbs={false} autoPlay showIndicators infiniteLoop>
        {item.images &&
          item.images.map((v, i) => {
            return (
              <div key={i}>
                <img
                  src={v.path}
                  style={{
                    height: "200px",
                    width: "auto",
                    overflow: "hidden"
                  }}
                />
              </div>
            );
          })}
      </Carousel>
        <h4 style={{textAlign:"center"}}>Image: 1 of {item.images.length}</h4>
      <h2 className="mp_0">
        <a href="#">{item.title}</a>
      </h2>
      <h3 className="mp_0">
        <a href="#">
          <b>By {auction.title}</b>
        </a>
      </h3>

      <h2
        className="text_center fadeOut"
        style={{ color: "yellow", backgroundColor: "gray" }}
      >
        {warning}
      </h2>
      {user ? (
        <div className="text_center">
          <h3>
            <b>
              Current bid is {" "}
              ${item.finalBid ? item.finalBid.bid : item.startingBid}
            </b>
          </h3>
          {/* <p className="mp_0">
            <i>Your bid will be made with 10% increament. </i>
            <Button type="primary" onClick={() => emitBid(true)}>
              Palace Bid
            </Button>
          </p> */}
          {/* or */}
          <p className="mp_0">
            <Input
              placeholder="Enter your Bid here"
              className="m_3"
              style={{
                backgroundColor: "#fafafa",
                marginBottom: "10px",
                display: "inline-block",
                width: "200px"
              }}
              type="number"
              onChange={e => setBid(e.target.value)}
            />
            <Button
              type="primary"
              className="m_3"
              onClick={() => emitBid(false)}
            >
              Place Custom Bid
            </Button>
          </p>
          <i>Or Increment By: </i>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 1)}
          >
            $1
          </Button>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 2)}
          >
            $2
          </Button>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 5)}
          >
            $5
          </Button>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 10)}
          >
            $10
          </Button>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 20)}
          >
            $20
          </Button>
          <Button
            type="primary"
            size={"small"}
            className="m_1"
            onClick={() => emitBid(true, 50)}
          >
            $50
          </Button>
        </div>
      ) : (
        <div className="text_center">
          <h2>Login to Bid On This Item</h2>
          <Button type="primary" className="m_3 bg_brown" block>
            Register Now
          </Button>
        </div>
      )}
      <hr className="mp_0" />
      <h3 className="mp_0">
        <a href="#">
          <b>Details</b>
        </a>
      </h3>
      <p className="mp_0 m_3">{item.description}</p>
    </Card>
  );
}
