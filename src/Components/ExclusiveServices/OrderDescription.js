import React, { Component } from 'react'
import {connect} from 'react-redux'
import ExlusiveNavbar from './ExlusiveNavbar'
import {Divider,Avatar,Button,Modal,Rate,Input,message} from 'antd'
import './CSS/OrderDescription.css'
import {ReadExclusiveOrders,CompleteExclusiveSellerOrder,DeleteExclusiveBuyerOrder} from '../../store/actions/ExclusiveOrderAction'
import {AddExclusiveServiceReview} from '../../store/actions/ExclusiveServicesAction'



class MyOrders extends Component {

    state={
        isCompleteModal:false,
        rateValue:1,
        Review:''
    }

    componentWillMount(){
        this.props.readOrders();
    }

    handleCompleteOrder=()=>{
        if(this.state.Review.trim() === '')
        {
            message.error("Please give review...")
        }
        else
        {

            const data ={
                buyerName:'',
                buyerID:'',
                buyerImage:'',
                buyerCountry:'',
                serviceID:'',
                Date:new Date().toLocaleDateString(),
                Messege:this.state.Review,
                Ratings:this.state.rateValue
            }
    
            this.props.ordersData.map(orders=>{
                if(orders._id === this.props.match.params.jobId)
                {
                    data.buyerName = orders.buyerName;
                    data.buyerID = orders.buyerID;
                    data.buyerImage = orders.buyerProfilePic;
                    data.buyerCountry = orders.buyerCountry;
                    data.serviceID = orders.ServiceId;            
                }
              })

            this.setState({isCompleteModal:false})
            this.props.completeOrder({Id:this.props.match.params.jobId})
            this.props.addReview({totalRatings:this.state.rateValue,Review:data})
        }
    }

    handleCancelExclusiveOrder=()=>{

        const data ={
            Id:'',
            startDate:'',
            endDate:'',
        }

        this.props.ordersData.map(orders=>{
            if(orders._id === this.props.match.params.jobId)
            {
                data.Id = orders._id;
                data.startDate = orders.startTime;
                data.endDate = orders.endTime;
            }
          })

          this.props.cancelOrder(data)
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
                data.profilePic = orders.sellerProfilePic;
                data.Name = orders.sellerName;            
            }
          })

        return (
            <div className="order-description-Container">
                <ExlusiveNavbar />
                <div className="order-description-Body-Container">
                    <div className="order-description-Body">
                        <h1>Job Description</h1>
                        <Divider></Divider>
                        <div className="order-description-Detail">  
                            <div className="order-description-Detail-box">
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
                                    <h2 style={{margin:0,fontWeight:'bold'}}>About Seller</h2>
                                </div>
                                <div style={{padding:5,paddingLeft:30,paddingRight:30}}>
                                    <Avatar size={80} src={data.profilePic} />
                                    <div style={{display:'flex',alignItems:'center',marginTop:10}}>
                                        <h3 style={{margin:0,fontWeight:'bold',marginRight:5}}>Name:</h3>
                                        <p style={{margin:0,fontSize:18}}>{data.Name}</p>
                                    </div>
                                </div>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <Button size="large" style={{backgroundColor:'#b17e4e',color:'white',marginTop:20,width:'50%'}} onClick={this.handleCancelExclusiveOrder} >Cancel</Button>
                                    <Button size="large" style={{backgroundColor:'#8b0000',color:'white',marginTop:20,width:'50%'}} onClick={()=>this.setState({isCompleteModal:true})}>Complete</Button>

                                    <Modal visible={this.state.isCompleteModal} onCancel={()=>this.setState({isCompleteModal:!this.state.isCompleteModal})} title="Your Feedback" footer={null}>
                                        <div>
                                            <div style={{marginBottom:'20px'}}>
                                                <h3 style={{margin:0,fontWeight:'bold'}}>Rate</h3>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                    <Rate value={this.state.rateValue} onChange={(value)=>this.setState({rateValue:value})} />
                                                    <h2 style={{margin:0,fontWeight:'bold',marginLeft:10,marginTop:5}}>{this.state.rateValue}</h2>
                                                </div>
                                            </div>
                                            <div style={{marginBottom:'20px'}}>
                                                <h3 style={{margin:0,fontWeight:'bold'}}>Review</h3>
                                                <Input.TextArea rows="8" value={this.state.Review} style={{resize:'none'}} onChange={(e)=>this.setState({Review:e.target.value})}></Input.TextArea>
                                            </div>   
                                            <div style={{marginBottom:'20px'}}>
                                                <Button size="large" style={{backgroundColor:'#b17e4e',color:"white"}} onClick={this.handleCompleteOrder}>Submit</Button>
                                            </div>
                                        </div>
                                    </Modal>
                                
                                
                                </div>
                               
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
    ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))},
      completeOrder:(completeOrder)=>{dispatch(CompleteExclusiveSellerOrder(completeOrder))},
      addReview:(Review)=>{dispatch(AddExclusiveServiceReview(Review))},
      cancelOrder:(deleteData)=>{dispatch(DeleteExclusiveBuyerOrder(deleteData))}
  }
}


export default connect(maStateToProps,mapDispatchToProps)(MyOrders);
