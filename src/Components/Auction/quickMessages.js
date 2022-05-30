import React from "react";
import { Card, Button } from "antd";
import { useSocket } from "use-socketio";
var userData = null
const MESSAGE_ARR = [
  "Hello",
  "How are you?",
  "Thank you",
  "Show me 360 view",
  "I`m out!",
  "Room is too dark",
  "Great!",
  "Looks nice!",
  "Show me 180 view"
];

export default function QuickMessages(props) {
  let data = localStorage.getItem('userData')
  if(data!==null){
    userData=JSON.parse(data)
  }
    const { auctionID } = props;
    const { socket } = useSocket("chat" + auctionID, (data) => console.log("chat", data));
 
  function chatEmit(e) {
    console.log(e)
      socket.emit("chat" + auctionID, { text: e, userName: userData.fName });
  }
  return (
    <Card
      className="m_3"
      style={{ height: "35vh", overflow: "hidden", overflowY: "scroll" }}
    >
      <h4>Quick Messages</h4>
      {MESSAGE_ARR.map((v, i) => {
        return (
          <Button
            key={i}
            type={i % 2 ? "primary" : ""}
            size={"small"}
            className="m_1"
            block
            onClick={() => chatEmit(v)}
          >
            {v}
          </Button>
        );
      })}
    </Card>
  );
}
