import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/SellerJobDescription.css'
import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {Divider,Avatar, Button,Modal} from 'antd'
import { Icon } from '@ant-design/compatible';

import {ReadExclusiveOrders,DeleteExclusiveSellerOrder} from '../../../store/actions/ExclusiveOrderAction'

class SellerJobDescription extends Component {

    state={
        confirmModal:false
    }

    componentWillMount(){
        this.props.readOrders();
      }

      handleDeleteJob=(Id)=>{
        this.setState({confirmModal:false})
        this.props.deleteSellerOrder({Id})
      }

    render() {

        const data ={
            SDate:'',
            EDate:'',
            Price:'',
            Detail:'',
            profilePic:'',
            Name:''
        }

        this.props.ordersData.map(orders=>{
            if(orders._id === this.props.match.params.jobId)
            {
                data.SDate = orders.startTime;
                data.EDate = orders.endTime;
                data.Price = orders.Price;
                data.Detail = orders.orderDetail;
                data.profilePic = orders.buyerProfilePic;
                data.Name = orders.buyerName;            
            }
          })
 

        return (
            <div className="sellerJob-Description-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="sellerJob-Description-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="sellerJob-Description-Body">
                        <h1>Job Description</h1>
                        <Divider></Divider>
                        <div className="sellerJob-Detail">  
                            <div className="sellerJob-Detail-box">
                                <div style={{padding:5,textAlign:'center',backgroundColor:'#eeeeee'}}>
                                    <h2 style={{margin:0,fontWeight:'bold'}}>About Job</h2>
                                </div>
                                <div style={{padding:5,paddingLeft:30,paddingRight:30}}>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>Starting Date:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.SDate}</p>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>End Date:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.EDate}</p>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>Price:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.Price}</p>
                                    </div>
                                    <div>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>Detail:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.Detail}</p>
                                    </div>
                                </div>
                                <div style={{padding:5,textAlign:'center',backgroundColor:'#eeeeee',marginTop:10}}>
                                    <h2 style={{margin:0,fontWeight:'bold'}}>About Buyer</h2>
                                </div>
                                <div style={{padding:5,paddingLeft:30,paddingRight:30}}>
                                    <Avatar size={80} src={data.profilePic} />
                                    <div style={{display:'flex',alignItems:'center',marginTop:10}}>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>Name:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.Name}</p>
                                    </div>
                                </div>
                                <Button size="large" style={{backgroundColor:'#b17e4e',color:'white',marginTop:20,width:'100%'}} onClick={()=>this.setState({confirmModal:true})}>Cancel</Button>

                                {/* Confirm Modal */}
                                <Modal title={<h3><Icon type="warning" style={{color:'#8b0000'}} /> Confirmation</h3>} visible={this.state.confirmModal} okText="Confirm" onCancel={()=>this.setState({confirmModal:false})} onOk={()=>this.handleDeleteJob(this.props.match.params.jobId)} closable={false}>
                                        <p style={{fontSize:'15px'}}>Are you sure! you want to cancel this order....</p>
                                </Modal>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const maStateToProps=(state)=>{
    return{
      ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
        readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))},
        deleteSellerOrder:(deleteOrder)=>{dispatch(DeleteExclusiveSellerOrder(deleteOrder))}
    }
  }
  
  
  export default connect(maStateToProps,mapDispatchToProps)(SellerJobDescription);
