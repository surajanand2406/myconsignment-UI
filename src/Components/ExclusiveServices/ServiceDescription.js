import React, { Component } from 'react'
import {connect} from 'react-redux'
import ExlusiveNavbar from './ExlusiveNavbar'
import {Redirect} from 'react-router-dom'
import './CSS/ServiceDescription.css'
import {Icon, Button,Divider,List,Avatar,Rate} from 'antd'
import { Carousel } from 'react-responsive-carousel'
import {ReadExclusiveServices} from '../../store/actions/ExclusiveServicesAction'


var width = window.screen.width;
class ServiceDescription extends Component {

    state={
        windowWidth:width,
        data:[],
        isContact:false
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 

        this.setState({isContact:false})
        this.props.readServices()
    }


    handleCreateChat=()=>{

        const data ={
            userId:'',
            userName:'',
            userImage:'',
        }
        
        this.props.serviceData.map(service=>{
             if(service._id === this.props.match.params.id)
             {
                 data.userId = service.userID;
                 data.userName = service.userName;
                 data.userImage = service.userImage;
             }
        })

        const chatData = {
            messeges:[],
            sellerID:data.userId,
            sellerProfilePic:data.userImage,
            sellerName:data.userName,
            buyerID:'buy111',
            buyerProfilePic:'',
            buyerName:'Ali',
            ServiceId:this.props.match.params.id
        }

        fetch('http://localhost:5000/createexclusivechat',{
            method:'post',
            body:JSON.stringify(chatData),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res2=>{
            this.setState({isContact:true})
        })

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
             if(service._id === this.props.match.params.id)
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
        
        if(this.state.isContact===true)
        {
            return <Redirect to="/exclusive-services-messeges" />
        }
        {
            return (
                <div className="ServiceDes-Container">
                    <ExlusiveNavbar />
                    <div className="ServiceDes-Body-Container">
                        <div className="ServiceDes-Body">
                            <div className="Service-Description">
                                <div className="Service">
                                    <h1 style={{marginBottom:0}}>{data.Title}</h1>
                                    <h3 style={{marginTop:0,marginBottom:20,fontWeight:'bold'}}>Starting Price ${data.Price}</h3>
                                    <Carousel autoPlay showThumbs={false} showArrows={true} showStatus={false} width={(this.state.windowWidth<=540) ? 300 :(this.state.windowWidth<=668) ? 500 : (this.state.windowWidth<=1024) ? 600 : (this.state.windowWidth<=1200) ? 700 : 800} infiniteLoop >
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
                                                <Button size="large" style={{backgroundColor:'#B17E4E',color:'white'}}>Contact Me</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Divider></Divider>

                                    <h2 style={{fontWeight:'bold'}}>Reviews ({data.Reviews.length})</h2>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={data.Reviews}
                                        size="large"
                                        pagination={{pageSize:10}}
                                        renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar size={60} src={item.buyerImage} />}
                                                title={<h4 style={{margin:0,fontWeight:'bold'}}>{item.buyerName}</h4>}
                                                description={<div style={{display:'flex',alignItems:'center'}}><Rate style={{marginBottom:15}} disabled value={item.Ratings} /> <h2 style={{marginLeft:10}}>{item.Ratings}</h2></div>}
                                            />
                                                {item.Messege}
                                        </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="Seller-Description">
                                <div className="Seller-Description-Card">
                                    <div style={{backgroundColor:"#eeeeee",width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:10}}>
                                            <h2 style={{fontWeight:'bold',margin:0}}>About The Seller</h2>
                                    </div>
                                    <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:5}}>
                                        <Avatar shape="circle" style={{border:'solid 1px #eeeeee'}} size={150} src={data.userImage} />
                                    </div>
                                    <Divider style={{marginBottom:10,marginTop:5}}></Divider>

                                    <h3 style={{marginLeft:10,fontWeight:'bold'}}>Name : {data.userName}</h3>

                                    <Divider style={{marginBottom:10,marginTop:10}}></Divider>

                                    <h3 style={{marginLeft:10,fontWeight:'bold'}}>Country : {data.userCountry}</h3>

                                    <Divider style={{marginBottom:10,marginTop:10}}></Divider>

                                    <h3 style={{marginLeft:10,fontWeight:'bold',display:'flex',alignItems:'center'}}>
                                        Ratings : <Rate allowHalf disabled value={data.Ratings} style={{marginRight:10,marginLeft:5}} /> <h2 style={{margin:0,color:'#fadb14'}}> {data.Ratings} </h2>
                                    </h3>
                                        
                                    <Button size="large" style={{height:'50px',width:'100%',backgroundColor:'darkgreen',color:'white'}} onClick={this.handleCreateChat}>Contact Me</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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


export default connect(mapStateToProps,mapDispatchToProps)(ServiceDescription)
