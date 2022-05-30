import React from "react";
import Navbar from "../Navbar";
// import { Row, Col, List, Typography, Card, Button, Icon } from "antd";
// import { url } from "./../../Constants";
// import { Carousel } from "react-responsive-carousel";
// import { Link } from "react-router-dom";

import * as VoxImplant from "voximplant-websdk";
export default function ItemDetails(props) {
  const [video, setVideo] = React.useState(null);
  React.useEffect(() => {
    const voximplant = VoxImplant.getInstance();
    voximplant.addEventListener(VoxImplant.Events.SDKReady, () => {
      // SDK initialized
      voximplant.addEventListener(
        VoxImplant.Events.ConnectionEstablished,
        () => {
          // Connection was established successfully
          voximplant.addEventListener(VoxImplant.Events.AuthResult, event => {
            if (event.result) {
              // Authorization success
              console.log("sucess", event);
            } else {
              // Authorization failure
            }
          });
          voximplant.login("mujahid@auction.ahaseeb.voximplant.com", "123456");
        }
      );
      voximplant.connect();
    });
    // Add event handler BEFORE calling method for Babel compatibility.
    voximplant.init();

    VoxImplant.getInstance().addEventListener(
      VoxImplant.Events.IncomingCall,
      e => {
        // answer the incoming call, or decline() to decline
        console.log(e.call);
        e.call.answer();
        console.log("You can hear audio from the cloud");
        e.call.on(VoxImplant.CallEvents.MediaElementCreated, onMediaElement);
        e.call.on(VoxImplant.CallEvents.Disconnected, () =>
          console.log("The call has ended")
        );
        e.call.on(VoxImplant.CallEvents.Failed, e =>
          console.log(`Call failed with the ${e.code} error`)
        );
      }
    );
  }, []);

  function onMediaElement(e) {
    // For WebRTC just using JS/CSS for transformation
    let video = e.element;
    console.log(e)
    // video.css('margin-left', '10px').css('width', '320px').css('height', '240px').css('float', 'left');

    setVideo(video);
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: 10 }}>
        {/* {video} */}
        {/* {video[0] && video[0].play()} */}
      </div>
    </div>
  );
}
