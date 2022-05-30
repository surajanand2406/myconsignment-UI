import React, { Component } from 'react'
import {connect} from 'react-redux'
import CustomMadeNavbar from './CustomMadeNavbar'
import { Button,Input} from 'antd'
import './CSS/JobDescription.css'
import {ReadJob} from '../../store/actions/JobBoardActions'
import {SendPropsal} from '../../store/actions/ChatActions'



class JobDescription extends Component {

    state={
        priceValue:'',
        shippingValue:'',
        proposalDetail:'',
        userData:{}
    }

    componentDidMount(){
        const data = localStorage.getItem('userData');
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }

        this.props.readJob();
    }

    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSendProposal=()=>{

        var newData ={

            buyerFirebaseID:'',
            buyerProfilePic:'',
            buyerName:'Asim',
            
        }

        var id =this.props.match.params.id;
        this.props.jobsData.map((data,i)=>{
                if(id==data._id)
                {
                    newData.buyerFirebaseID = data.firebaseUID;
                    newData.buyerProfilePic = data.ProfilePic;
                    newData.buyerName = data.BuyerName;


                }
        })


        const data = {
            messages:[
                {
                    Text:'',
                    Image:'',
                    Proposal:{
                        Price:this.state.priceValue,
                        Shipping:this.state.shippingValue,
                        proposalDetail:this.state.proposalDetail,
                        jobId:this.props.match.params.id
                        },
                    senderAvatarLink:this.state.userData.profilePic,
                    senderID:this.state.userData.firebaseUID,
                    senderName:this.state.userData.fName
                }
            ],
            sellerfirebaseID:this.state.userData.firebaseUID,
            sellerProfilePic:this.state.userData.profilePic,
            sellerName:this.state.userData.fName,
            buyerFirebaseID:newData.buyerFirebaseID,
            buyerProfilePic:newData.buyerProfilePic,
            buyerName:newData.buyerName,
            isRead:false

        }


        this.setState({priceValue:'',shippingValue:'',proposalDetail:''})

        this.props.sendProposal(data);

    }


    render() {

        var newData ={
            JobTitle:'',
            Budget:'',
            BuyerName:'',
            PostedDate:'',
            JobDetail:'',
            Material:'',
            Size:'',
            Shipping:'',
            Image:'',
            firebaseUID:''
        }

        var id =this.props.match.params.id;
        this.props.jobsData.map((data,i)=>{
                if(id==data._id)
                {
                    newData.JobTitle = data.JobTitle;
                    newData.Budget = data.Budget;
                    newData.BuyerName = data.BuyerName;
                    newData.PostedDate = data.PostedDate;
                    newData.JobDetail = data.JobDetail;
                    newData.Material = data.MaterialDes;
                    newData.Size = data.Size;
                    newData.Shipping = data.Shipping;
                    newData.Image = data.Image;
                    newData.firebaseUID = data.firebaseUID;

                }
        })


        return (
            <div className="job-description-container">
                <CustomMadeNavbar />

                <div className="job-description-body-container">  
                    <div className="job-description-body">   

                        <div className="job-description-job-detail-section">
                            <div className="image">
                                <img  src={newData.Image} style={{maxWidth:'100%',maxHeight:'100%'}}  />
                            </div>      
                            <div className="job-description-job-detail" style={{marginLeft:'20px'}}>
                                <div className="job-description-price-section">
                                    <h1 style={{color:'darkgreen'}}>{newData.JobTitle}</h1>
                                </div>
                                <div style={{width:'50%',display:"flex",alignItems:'center'}}>
                                    <div style={{width:'50%'}}>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Budget</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Posted Date</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Customer</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Material</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Size</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>Shipping</p>
                                    </div>
                                    <div>
                                        <p style={{fontWeight:'bold',color:'gray'}}>${newData.Budget}</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>{newData.PostedDate}</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>{newData.BuyerName}</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>{newData.Material}</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>{newData.Size}</p>
                                        <p style={{fontWeight:'bold',color:'gray'}}>{newData.Shipping}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 style={{fontWeight:'bold'}}>Detailed Info</h3>
                                    <p style={{fontSize:'16px'}} >{newData.JobDetail}</p>
                                </div>
                            </div>
                        </div>
                        <div  className="job-description-messege-section">
                            <h2>Respond to this job</h2>
                            <div style={{marginTop:'30px'}}>
                                <h3>Enter Your Price:</h3>
                                <Input size="large" placeholder="Price..." name="priceValue" value={this.state.priceValue} onChange={this.handleInput} style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Shipping:</h3>
                                <Input size="large" placeholder="Shipping..." name="shippingValue" value={this.state.shippingValue} onChange={this.handleInput} style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Your Proposal:</h3>
                                <Input.TextArea size="large" style={{border:'solid 1px gray'}} name="proposalDetail" value={this.state.proposalDetail} onChange={this.handleInput} autoSize={{minRows:10}}></Input.TextArea>
                            </div>
                            <Button size="large" style={this.state.userData.firebaseUID === newData.firebaseUID ? {display:'none'} : {width:'150px',marginTop:'50px',color:'white',backgroundColor:'darkgreen'}} onClick={this.handleSendProposal}>Send Proposal</Button>
                        </div>
                    </div>
                </div>             
            </div>               
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        jobsData:state.JobBoardReducer.JobBoardData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readJob:()=>{dispatch(ReadJob())},
        sendProposal:(data)=>{dispatch(SendPropsal(data))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(JobDescription);
