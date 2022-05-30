/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { Row, Col, List, Typography, Card, Button,  Input,Tooltip,Upload,message } from "antd";
import { Icon } from '@ant-design/compatible';
import "../CSS/auction.css";
import { url,headers } from "../../Constants";
import { Button as Btn } from '@zendeskgarden/react-buttons';
import {faTimes,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Zoom from 'react-reveal/Zoom';
import './myAuctions.css'
import { Spin, Alert,Modal } from "antd";
import useWindowDimensions from "./dimentions";
const { Dragger } = Upload;

export default function myAuctions(props) {
  const [auctionList, setAuctionList] = React.useState([]);
  const [loading, setLoading,] = React.useState(false);
  const [auctionModal, showAuctionModal] = React.useState(false);
  const [auctionType,setAuctionType] = React.useState(-1)
  const { width } = useWindowDimensions();
  const [user] = React.useState(JSON.parse(localStorage.getItem("userData")));
  const prps = {
    name: 'file',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  React.useEffect(() => {
    // setTimeout(()=>{
    // showAuctionModal(true)

    // },2000)
    if(user){
      let data = {
        id:user._id
      }
      fetch(url + "/api/getMyAuctions",{method:"POST",body:JSON.stringify(data),headers})
      .then(res => res.json())
      .then(data => {
        console.log('Auctions => ', data.docs);
        setAuctionList(data.docs);
      });
    }
  }, [user]);
 

  if (loading) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Please Wait while Auction Details are being loaded"
          type="info"
          style={{ height: "100vh" }}
        />
      </Spin>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Row style={{ margin: 10 }}>
          {width >= 640 && (
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <div style={{ margin: 5 }}>
                {user && <div style={{padding:15,borderWidth:1,borderColor:"gray",textAlign:"center",fontSize:20}}>
                <Link to='myAuctions'>My Auctions</Link>
                </div>}
                {(user===undefined || user===null) && <div style={{padding:15,borderWidth:1,borderColor:"gray",textAlign:"center",fontSize:20}}>
                    <h3>Login to bid now</h3>
                  </div>}
                {user && (
                  <List
                    bordered
                    dataSource={[1]}
                    renderItem={item => {
                      return (
                        <List.Item>
                          <Typography.Text>
                            <Link to={`items_won/`}>Items Won</Link>
                          </Typography.Text>
                        </List.Item>
                      );
                    }}
                  />
                )}
                {user && <Modal onCancel={()=>{showAuctionModal(false)}} footer={null} visible={auctionModal} >
                  {auctionType===-1 && <div>
                    <h1 style={{textAlign:"center"}}>Add a new Auction</h1>
                  <br/>
                  <h3><b>*Instructions</b></h3>
                  <h4>Two types of auctions are:</h4>
                  <ul>
                    <li><b>Live:</b> Auction with live video broadcasting to be done by mobile app while auctioneer manages the live auction.</li>
                    <li><b>Timed:</b> System managed auction with live bidding managed by timer for each lot.</li>
                  </ul>
                  <br/>
                  <h2 style={{textAlign:"center"}}>Select auction type</h2>
                  <div style={{ display:"flex",justifyContent:"space-around" }}>
                  <Btn onClick={()=>{
                    setAuctionType(0)
                  }} style={{width:150,height:50}} size='large'><h4 style={{fontWeight:"bolder"}}>Live
                  </h4>
                  </Btn>
                  <Button onClick={()=>{
                    setAuctionType(1)
                  }} style={{width:150,height:50}} size='large'><h4 style={{fontWeight:"bolder"}}>Timed</h4></Button>
                  
                  </div>
                    </div>}
                    {auctionType===0 && <Zoom duration={500}>
                    <Button onClick={()=>{
                      setAuctionType(-1)

                    }} type='link' >Go back</Button>
                      <h1 style={{textAlign:"center"}}>Live Auction</h1>
                        <label style={{fontSize:15,marginBottom:5}} for='title'><b>Title</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='title'
                        placeholder='Title of Auction'
                        autoComplete='off'
                        autoFocus={true}
                        />
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='description'><b>Description</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input.TextArea
                        rows='3'
                        name='description'
                        placeholder='Description for Auction'
                        autoComplete='off'
                        style={{resize:'none'}}
                        />
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Starting Time</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='time'
                        placeholder='Title of Auction'
                        autoComplete='off'
                        type='datetime-local'
                        />
                        
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Auction Cover</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Dragger {...prps}>
                        <p className="ant-upload-drag-icon">

                        </p>
                        <p className="ant-upload-text">ADD AUCTION COVER</p>
                        <p className="ant-upload-hint">
                          Add your auction cover photo by clicking on this area or dragging your photo over it.
                        </p>
                      </Dragger>
                      <br/>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                        <Button size='large' shape='round'>Add Auction</Button>
                        </div>
                      </Zoom>}
                      {auctionType===1 && <Zoom duration={500}>
                    <Button onClick={()=>{
                      setAuctionType(-1)
                    }} type='link' >Go back</Button>

                      <h1 style={{textAlign:"center"}}>Timed Auction</h1>
                        <label style={{fontSize:15,marginBottom:5}} for='title'><b>Title</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='title'
                        placeholder='Title of Auction'
                        autoComplete='off'
                        autoFocus={true}
                        />
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='description'><b>Description</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input.TextArea
                        rows='3'
                        name='description'
                        placeholder='Description for Auction'
                        autoComplete='off'
                        style={{resize:'none'}}
                        />
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Starting Time</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='time'
                        placeholder='Title of Auction'
                        autoComplete='off'
                        type='datetime-local'
                        />
<br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Bidding Time</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='time'
                        placeholder='Item bidding time'
                        autoComplete='off'
                        type='number'
                        defaultValue={20}
                        suffix='seconds'
                        min={10}
                        max={1000}
                        />
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Auction Cover</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Dragger {...prps}>
                        <p className="ant-upload-drag-icon">

                        </p>
                        <p className="ant-upload-text">ADD AUCTION COVER</p>
                        <p className="ant-upload-hint">
                          Add your auction cover photo by clicking on this area or dragging your photo over it.
                        </p>
                      </Dragger>
                        <br/>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                        <Button size='large' shape='round'>Add Auction</Button>
                        </div>
                      </Zoom>}
                  </Modal>}
              </div>

              <div style={{ margin: 5 }}>
                <List
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10
                  }}
                  bordered
                  dataSource={auctionList}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text>
                        <Link to={`/auctionCatalogue/${item._id}`}>
                          {item.title}
                        </Link>
                      </Typography.Text>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          )}
          <Col
            xs={width >= 640 ? 16 : 24}
            sm={width >= 640 ? 16 : 24}
            md={width >= 640 ? 16 : 24}
            lg={width >= 640 ? 16 : 24}
            xl={width >= 640 ? 16 : 24}
          >
            <div style={{ margin: 5 }}>
              <List
                header={
                  <div style={{ display:'flex',flexDirection:"row",justifyContent:"space-between",alignItems:"center" }}>
                    <h2>Upcoming Auctions</h2>
                    {user && <Btn onClick={()=>{
                      showAuctionModal(true)
                    }}>Add New Auction</Btn>}
                  </div>
                }
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5
                }}
                bordered
                dataSource={auctionList}
                renderItem={item => (
                  <div className="Card">
                            <div className="card-image">
                                <img src={item.image} alt='no cover' style={{maxWidth:'100%',maxHeight:'100%'}} />
                            </div>
                            <div className="card-data">
                                <div className="card-data-header">
                                <h2>{item.title}</h2>
                                <FontAwesomeIcon  icon={faTrash} size="lg" />

                                </div>
                                <p>{item.details}</p>
                                <Btn className='itemBtn' style={{alignSelf:"flex-end"}}>Add Items</Btn>
                            </div>
                        </div>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

