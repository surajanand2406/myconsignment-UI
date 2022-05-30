import React from "react";
import Navbar from "../Navbar";
import { Row, Col, List, Typography, Card, Button, Modal,Upload, Tooltip,message } from "antd";
import { Icon } from '@ant-design/compatible';
import { Input } from "antd";
import "../CSS/auction.css";
import { url } from "./../../Constants";
import { Link } from "react-router-dom";
import useWindowDimensions from "./dimentions";
import { Button as Btn } from '@zendeskgarden/react-buttons';
const { Dragger} = Upload
export default function AuctionDashboard(props) {
  const [itemList, setItemList] = React.useState([]);
  const [auction, setAuction] = React.useState([]);
  const { height, width } = useWindowDimensions();
  const [itemModal, showItemModal] = React.useState(false);
  const [user] = React.useState(JSON.parse(localStorage.getItem("userData")));
  React.useEffect(() => {
    fetch(url + "/api/getItems?id=" + props.match.params.id + "&used=" + false)
      .then(res => res.json())
      .then(data => {
        console.log('auctionItems=>',data.doc);
        setItemList(data.doc);
      });
    fetch(url + "/api/getAuctionById?id=" + props.match.params.id)
      .then(res => res.json())
      .then(data => {
        console.log('auctiondetail=>',data.doc);
        setAuction(data.doc);
      });
  }, [props.match.params.id]);
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
  return (
    <div>
      {user && <Modal footer={null} visible={itemModal} onCancel={()=>{showItemModal(false)}}>
      <div>
                    <h1 style={{textAlign:"center"}}>Add a new Item</h1>
                  <br/>
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
                                          <label style={{fontSize:15,marginBottom:5}} for='bid'><b>Starting Bid</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Input
                        name='bid'
                        placeholder='Starting Bid'
                        type='number'
                        min='1'
                        prefix='$'
                        autoComplete='off'
                        />
                        <br/>
                        <br/>
                        <label style={{fontSize:15,marginBottom:5}} for='time'><b>Item Images</b>
                        <span>
                        <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                <Icon  type="info-circle" theme='outlined' style={{ marginLeft:5, fontSize:'14px' }} />
                                    </Tooltip>
                        </span>
                        </label>
                        <Dragger {...prps}>
                        <p className="ant-upload-drag-icon">

                        </p>
                        <p className="ant-upload-text">ADD ITEM IMAGES</p>
                        <p className="ant-upload-hint">
                          Add item images by clicking on this area or dragging your photo over it.
                        </p>
                      </Dragger>
                      <br/>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                        <Button size='large' shape='round'>Add Item</Button>
                        </div>
                  </div>
        </Modal>
        }
      <Navbar />
      <Row style={{ margin: 10 }}>
        {width >= 640 && (
          <Col xs={8} sm={8} md={6} lg={8} xl={8}>
            <div style={{ margin: 5 }}>
              <List
                // header={
                //   <div>
                //     <Input
                //       placeholder="Search by Title"
                //       size="large"
                //       style={{
                //         backgroundColor: "#fafafa",
                //         marginBottom: "10px"
                //       }}
                //     />
                //   </div>
                // }
                bordered
                dataSource={itemList ? itemList : []}
                renderItem={(item, index) => (
                  <List.Item>
                    <Typography.Text>
                      <a href="#">{item.title}</a>
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
                    <h2>Auction Items</h2>
                    {user&& user._id===auction.userId && <Btn onClick={()=>{
                      showItemModal(true)
                    }}>Add New Item</Btn>}
                  </div>
              }
              bordered
              dataSource={itemList ? itemList : []}
              renderItem={(item, index) => (
                <Card style={{ width: "100%", margin: 0, padding: 0 }}>
                  <Row className="mp_0">
                    <Col
                      className="mp_0"
                      xs={width >= 440 ? 8 : 24}
                      sm={width >= 440 ? 8 : 24}
                      md={width >= 440 ? 8 : 24}
                      lg={width >= 440 ? 8 : 24}
                      xl={width >= 440 ? 8 : 24}
                    >
                      <img
                        src={item.images[0] && item.images[0].path}
                        width="auto"
                        height="120px"
                        className="itemImage"
                        alt='item'
                      />
                    </Col>
                    <Col
                      className="mp_0"
                      xs={width >= 440 ? 16 : 24}
                      sm={width >= 440 ? 16 : 24}
                      md={width >= 440 ? 16 : 24}
                      lg={width >= 440 ? 16 : 24}
                      xl={width >= 440 ? 16 : 24}
                    >
                      <div className="m_3">
                        <h3 className="mp_0">
                          <a href="#">Lot No: {index + 1}</a>
                        </h3>
                        <h2 className="mp_0">
                          <Link
                            to={`/item/${props.match.params.id}/${item._id}`}
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <p className="mp_0 we_500">
                          Starting Bid: {item.startingBid}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
