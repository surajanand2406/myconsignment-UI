import React from "react";
import { Card, Button, Input } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useSocket } from "use-socketio";
export default function AuctionDetails(props) {
  const [user] = React.useState(JSON.parse(localStorage.getItem("userData")));

  let auctionID = props.match.params.auctionID;
  const [auction, setAuction] = React.useState({});
  // const [user, setUser] = React.useState(true);
  const [bid, setBid] = React.useState(0);
  const [timeOutUsers, setTimeOutUsers] = React.useState(0);

  const [timeOut, setTimeOut] = React.useState(1000 * 20);
  const [userCount, setUserCount] = React.useState(0);
  const [warning, setWarning] = React.useState("");
  const [item, setItem] = React.useState({
    images: [],
    title: "Loading...",
    startingBid: "Loading..."
  });

  const itemRef = React.useRef(item);
  itemRef.current = item;
  const timeUserRef = React.useRef(timeOutUsers);
  timeUserRef.current = timeOutUsers;

  const timeRef = React.useRef(timeOut);
  timeRef.current = timeOut;

  const timeUsersRef = React.useRef(timeOutUsers);
  timeUsersRef.current = timeOutUsers;
  const auctionRef = React.useRef(auction);
  auctionRef.current = auction;

  const { socket } = useSocket("startAuction" + auctionID, data => {
    if (data.doc.status === 1) {
      setAuction(data.doc);
      setTimeOut(data.doc.bidTime * 1000);
      setTimeOutUsers(data.doc.bidTime);
      console.log(data.doc.bidTime);
    } else {
      props.history.replace("/auction");
    }
    // console.log("auction detaisl", data.doc.bidTime * 1000);
  });

  // useInterval(() => {
  // }, timeOut);

  useTimerInterval(() => {
    setTimer(timeUsersRef.current - 1);
  }, 1000);

  function setTimer(e) {
    console.log(e, "setTimer");
    if (timeUsersRef.current !== 0) {
      timeUsersRef.current = timeUsersRef.current - 1;
      setTimeOutUsers(e);
    } else {
      closeItem();
      console.log("will be closed now");
    }
  }

  React.useEffect(() => {
    emitDemo(auctionID);
    emitItem(auctionID);

    socket.on("warning" + auctionID, function(data) {
      setWarning("Item is About To close");
    });

    socket.on("item" + auctionID, function(data) {
      if (data.doc && data.doc.finalBid) {
        if (itemRef.current._id) {
          if (itemRef.current.finalBid) {
            if (itemRef.current.finalBid.bid !== data.doc.finalBid.bid) {
              let time =
                parseInt(timeUsersRef.current) +
                parseInt(auctionRef.current.bidTime / 2);
              console.log(
                parseInt(timeOut / 2000),
                parseInt(auctionRef.current.bidTime)
              );

              setTimer(time);
              setTimeOut(
                (timeRef.current == (auctionRef.current.bidTime * 1000) / 2
                  ? auctionRef.current.bidTime * 1001
                  : auctionRef.current.bidTime * 1000) / 2
              );
              timeRef.current =
                (timeRef.current == (auctionRef.current.bidTime * 1000) / 2
                  ? auctionRef.current.bidTime * 1001
                  : auctionRef.current.bidTime * 1000) / 2;
            }
          }
        }
      }

      data.doc ? updateData(data.doc) : close_auction();
    });

    socket.on("count" + auctionID, data => {
      console.log("user Count +++++++++++++++++++++" + data.count);
      setUserCount(data.count);
    });

    socket.emit("count" + auctionID, "ok");
  }, []);

  // console.log(timeOut, "timeOut");

  async function closeItem() {
    console.log(timeOut, "TIme out des");
    if (itemRef.current._id) {
      let res = await axios.post(url + "/api/closeItemLive", {
        // used: false,
        _id: itemRef.current._id
      });

      // console.log(res.data, "respnse");
      socket.emit("itemDetails" + auctionID, auctionID);
    }
  }

  function updateData(val) {
    setItem(val);
  }

  function emitDemo(data) {
    socket.emit("start" + auctionID, auctionID);
  }

  async function emitItem(id) {
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
  const close_auction = () => {
    emitClose();
  };

  function emitClose() {
    axios
      .post(url + "/api/updateAuctionLive", {
        status: 0,
        _id: auctionID
      })
      .then(response => {
        socket.emit("start" + auctionID, auctionID);
        props.history.replace("/auction");
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
            socket.emit("itemDetails" + auctionID, auctionID);
          });
      }
    } else {
      alert("please enter a valid bid");
    }
  }

  return (
    <Card className="m_3">
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
      <hr className="mp_0" />
      <h2
        className="text_center fadeOut"
        style={{ color: "yellow", backgroundColor: "gray" }}
      >
        {warning}
      </h2>
      {user ? (
        <div className="text_center">
          <h3>
            item will be closed in {timeUsersRef.current} seconds <br /> - Bid
            On This item Now{" "}
            <b>
              <br />
              Current bid is{" "}
              {item.finalBid ? item.finalBid.bid : item.startingBid}
            </b>
          </h3>
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
          <i>Or Increment by: </i>
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
          <h2>Login to Bid On This Item</h2>{" "}
          <Button type="primary" className="m_3 bg_brown" block>
            Register Now
          </Button>
        </div>
      )}
    </Card>
  );
}

const useTimerInterval = (callback, delay) => {
  const savedCallback = React.useRef();
  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  console.log("dely", delay);

  // Set up the interval.
  React.useEffect(() => {
    console.log("dely", delay);

    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

function useInterval(callback, delay) {
  const savedCallback = React.useRef();
  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  console.log("dely", delay);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
