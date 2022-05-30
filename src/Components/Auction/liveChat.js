import React from "react";
import { Input, List, Typography } from "antd";
import { SocketIOProvider, useSocket } from "use-socketio";
const { Search } = Input;
var userData = null
export default function LiveVideo(props) {
  let data = localStorage.getItem('userData')
  if(data!==null){
    userData=JSON.parse(data)
  }
  const { auctionID } = props;
  const [chat, setChat] = React.useState([]);
  const [text, setText] = React.useState("");
  const { socket, subscribe, unsubscribe } = useSocket("chat" + auctionID, data => {
    let chatArr = chat.reverse();
    chatArr.push(data);
    setChat([...chatArr].reverse());
  })
 
  // React.useEffect(() => {
  //   socket.on(, function(data) {
  //     console.log(data);
   
  //   });
  // }, []);

  function chatEmit(e) {
    // console.log(e)
    socket.emit("chat" + auctionID, { text: e, userName: userData.fName });
    setText("");
  }

  if (chat === null) {
    return "loading desu";
  } else {
    return (
      <div>
        <List
          style={{
            height: "35vh",
            overflow: "hidden",
            overflowY: "scroll"
          }}
          className={"m_3"}
          header={
            <Search
              placeholder="Send Message .."
              enterButton="Send"
              size="large"
              value={text}
              onChange={e => setText(e.target.value)}
              onSearch={e => chatEmit(e)}
            />
          }
          bordered
          dataSource={chat}
          renderItem={item => (
            <List.Item
              className={userData.fName === item.userName ? "myChat" : ""}
            >
              <Typography.Text>
                {item.text}{" "}
                <b>{userData.fName}</b>
              </Typography.Text>
            </List.Item>
          )}
        />

        {/* <div class="fab">
          <FontAwesomeIcon  icon={faComments}/>
        </div> */}
      </div>
    );
  }
}
