import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/MyServiceDescription.css'
import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {Icon, Button,Divider,List,Avatar,Rate} from 'antd'
import { Carousel } from 'react-responsive-carousel'
import {ReadExclusiveServices} from '../../../store/actions/ExclusiveServicesAction'

var width = window.screen.width;
class MyEarnings extends Component {

    state={
        windowWidth:width,
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 

        this.props.readServices();
    }

    render() {

        const data ={
            Title:'',
            Images:[],
            Price:0,
            Des:'',
            userName:'',
            userImage:'',
            userCountry:'',
            Ratings:0,
            Reviews:[]
        }
        
        this.props.serviceData.map(service=>{
             if(service._id === this.props.match.params.serviceId)
             {
                data.Title = service.ServiceTitle
                data.Images = service.Images;
                data.Price = service.Price;
                data.Des = service.ServiceDescription;
                data.userName = service.userName;
                data.userImage = service.userImage;
                data.userCountry = service.userCountry;
                data.Ratings = service.totalRatings;
                data.Reviews = service.Reviews;


             }
        })


        return (
            <div className="myService-Description-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="myService-Description-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="myService-Description-Body">
                        <h1 style={{marginBottom:0}}>{data.Title}</h1>
                        <h3 style={{marginTop:0,marginBottom:20,fontWeight:'bold'}}>Starting Price ${data.Price}</h3>
                        <Carousel autoPlay showThumbs={false} showArrows={true} showStatus={false} width={(this.state.windowWidth<=360) ? 280 : (this.state.windowWidth<=540) ? 300 :(this.state.windowWidth<=668) ? 500 : (this.state.windowWidth<=1024) ? 600 : (this.state.windowWidth<=1200) ? 700 : 800} infiniteLoop >
                            {
                                data.Images.map(link=>{
                                    return <img src={link} style={(this.state.windowWidth<=540) ? {height:'200px'} :(this.state.windowWidth<=1024) ? {height:'400px'} : {height:'500px',maxWidth:'100%'}} />
                                })
                            }
                        </Carousel>
                        <h2 style={{margin:0,marginTop:20,fontWeight:'bold'}}>Service Description</h2>
                        <p style={{margin:0,fontSize:15}}>{data.Des}</p>

                        <div className="About-Seller">
                            <Divider></Divider>
                            <h2 style={{fontWeight:'bold'}}>About The Seller</h2>
                            <div style={{display:'flex',alignItems:"center"}}>
                                <div>
                                    <Avatar size={100} src={data.userImage} />
                                </div>
                                <div style={{marginLeft:10}}>
                                    <h4 style={{fontWeight:'bold',margin:0}}>{data.userName}</h4>
                                    <p style={{margin:0}}>Country: {data.userCountry}</p>
                                    <p style={{margin:0,display:'flex',alignItems:'center'}}>Ratings:  <Rate allowHalf disabled value={data.Ratings} style={{marginRight:10,marginLeft:5}} /> <h2 style={{margin:0,color:'#fadb14'}}> {data.Ratings} </h2></p>
                                </div>
                            </div>
                            <Divider></Divider>
                        </div>

                        <h2 style={{fontWeight:'bold'}}>Reviews ({data.Reviews.length})</h2>
                        <List
                            itemLayout="horizontal"
                            dataSource={data.Reviews}
                            size="large"
                            pagination={{pageSize:10}}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar size="large" src={item.buyerImage}/>}
                                    title={<h4 style={{margin:0,fontWeight:'bold'}}>{item.buyerName}</h4>}
                                    description={<div style={{display:'flex',alignItems:'center'}}><Rate style={{marginBottom:15}} disabled value={item.Ratings} /> <h2 style={{marginLeft:10}}>{item.Ratings}</h2></div>}
                                />
                                    {item.Messege}
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        serviceData:state.ExclusiveServicesReducer.ExclusiveServicesData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readServices:()=>{dispatch(ReadExclusiveServices())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyEarnings);
