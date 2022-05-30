import React, { Component } from 'react'
import {connect} from 'react-redux'
import {url} from '../../Constants'
import ClientSocket from 'socket.io-client'
import firebase from 'firebase'
import ExlusiveNavbar from './ExlusiveNavbar'
import Truncate from 'react-truncate'
import {Input,Button,Avatar,Modal,Upload,Drawer, Badge, Divider,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import './CSS/ExclusiveMesseges.css'
import {CreateExclusiveOrder} from '../../store/actions/ExclusiveOrderAction'


const socket = ClientSocket(url);

class ExclusiveMesseges extends Component {
    constructor(props){
        super(props)

        this.state={
            isViewProposal:false,
            isViewImage:false,
            isContactList:false,
            Messeges:[],
            OpenChat:[],
            myChats:[],
            searchedChats:[],


            Text:'',
            Price:0,
            Days:'',
            proposalDetail:'',
            orderDetail:"",

            viewProposalPrice:0,
            viewProposalDays:'',
            viewProposalDetail:'',
            viewImage:''
        }

        socket.on('Exclusive-New-Messege',(data)=>{

            this.setState({Messeges:this.state.Messeges.concat(data)})

            fetch(url+'/readexclusivechat')
            .then(res=>res.json())
            .then(res2=>{
                const myChats= res2.filter(chat=>{
                    return chat.buyerID === 'buy111'
                })
                this.setState({myChats})
            })
        })
    }
    


    componentDidMount(){
        fetch(url+'/readexclusivechat')
        .then(res=>res.json())
        .then(res2=>{
           const myChats= res2.filter(chat=>{
                return chat.buyerID === 'buy111'
            })
            this.setState({myChats})
        })
    }


    handleSearch=(e)=>{

        if(e.target.value.trim() !=="")
        {
           let list = this.state.myChats;

           let updatedList = list.filter(data=>{
                const item = data.sellerName.toLowerCase();
                const value = e.target.value.toLowerCase();

                return item.includes(value);
            })

            this.setState({searchedChats:updatedList})
        }
        else
        {
            this.setState({searchedChats:[]})
        }
    }


    handleSendFile=({file})=>{

        if(file.status ==='error')
        {
       
            var myfile = file.originFileObj;
        
            var storageRef = firebase.storage().ref();
                var mountainImagesRef = storageRef.child(`ExclusiveMessagefiles/`+`${this.state.myChats[0].buyerID}`+`_`+`${myfile.name}`);

                mountainImagesRef.put(myfile).then(()=> {
                    mountainImagesRef.getDownloadURL().then((url)=>{ 

                        const message = {
                            Text:'',
                            Image:'',
                            File:url,
                            Proposal:{
                            Price:0,
                            Shipping:'',
                            proposalDetail:'',
                            },
                            senderAvatarLink:'',
                            senderID:'buy111',
                            senderName:'Ali',
                            isRead:false,
                            chatId:this.state.OpenChat[0]._id
                        }
            
                        socket.emit('exclusive-new-messege',message)
  
                    })
                })
        }
       
    }


    chatImage=(file)=>{

       
        if(file.file.status === 'error')
        {

            const myfile = file.file.originFileObj;
             
            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child(`ExclusiveMessageImages/`+`${this.state.myChats[0].buyerID}`+`_`+`${myfile.name}`);

            mountainImagesRef.put(myfile).then(()=> {
                mountainImagesRef.getDownloadURL().then((url)=>{ 

                    const message = {
                        Text:'',
                        Image:url,
                        File:'',
                        Proposal:{
                        Price:0,
                        Shipping:'',
                        proposalDetail:'',
                        },
                        senderAvatarLink:'',
                        senderID:'buy111',
                        senderName:'Ali',
                        isRead:false,
                        chatId:this.state.OpenChat[0]._id
                    }
        
                    socket.emit('exclusive-new-messege',message)
                             
                })
            })
            
        }

    }

    handleReadMesseges=(Id)=>{

        fetch(url+'/readnewmesseges',{
            method:'Put',
            body:JSON.stringify({Id,userID:'buy111'}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
        })
        .then(res=>res.json())
        .then(res2=>{
          var newChats = this.state.myChats.map(chat=>{
                if(chat._id === res2._id)
                {
                    chat.messeges = res2.messeges
                    
                    return chat
                }

                return chat
            })
            this.setState({
                OpenChat:this.state.OpenChat.concat(res2),
                Messeges:res2.messeges,
                myChats:newChats,
                isContactList:false
            })
        })
           
    }

    handleSendTextMessege=()=>{
        if(this.state.Text.trim() !== '')
        {
            const message = {
                Text:this.state.Text,
                Image:'',
                File:'',
                Proposal:{
                Price:0,
                Shipping:'',
                proposalDetail:'',
                },
                senderAvatarLink:'',
                senderID:'buy111',
                senderName:'Ali',
                isRead:false,
                chatId:this.state.OpenChat[0]._id
            }

            this.setState({Text:''})

            socket.emit('exclusive-new-messege',message)
        }
        else
        {
            message.error("Please write message...")
        }
    }

    handleViewProposal=(Proposal)=>{
    
        this.setState({
            viewProposalPrice:Proposal.Price,
            viewProposalDays:Proposal.Shipping,
            viewProposalDetail:Proposal.proposalDetail,
            isViewProposal:true
        })
    }

    viewImage=(img)=>{
    
        this.setState({
            viewImage:img,
            isViewImage:true
        })
    }

    handleAcceptProposal=()=>{

        if(this.state.orderDetail.trim()==='')
        {
            message.error("Please describe your Order...")
        }
        else
        {

            var myDate = new Date();
            var newdate = myDate.toLocaleDateString();
        
        
            var d = new Date();
            d.setDate(d.getDate() + parseInt(this.state.viewProposalDays));
            var endDate = d.toLocaleDateString();

            const orderData = {

                sellerID:this.state.OpenChat[0].sellerID,
                sellerProfilePic:this.state.OpenChat[0].sellerProfilePic,
                sellerName:this.state.OpenChat[0].sellerName,
                buyerID:this.state.OpenChat[0].buyerID,
                buyerProfilePic:this.state.OpenChat[0].buyerProfilePic,
                buyerName:this.state.OpenChat[0].buyerName,
                startTime:newdate,
                endTime:endDate,
                Price:this.state.viewProposalPrice,
                Days:this.state.viewProposalDays,
                orderDetail:this.state.orderDetail,
                ServiceId:this.state.OpenChat[0].ServiceId,
                isComplete:false
            }

            this.setState({isViewProposal:false})

            this.props.createOrder(orderData)
        }

    }

    render() {
        const {Search} = Input;

        return (
            <div className="exclusive-messeges-container">
                <ExlusiveNavbar />
                <div className="exclusive-messeges-body-container">
                    <div className="exclusive-messeges-body">

                        {/*Chat Header For Small Devices */}
                        <div className="chat-header-for-small-device">
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Avatar size={40} src={this.state.OpenChat.length === 0 ? ' ' :this.state.OpenChat[0].sellerProfilePic} style={{display:this.state.OpenChat.length === 0 ? 'none' : 'inline'}} />
                                <h2 style={{margin:0,color:'white',marginLeft:'10px'}}>{this.state.OpenChat.length === 0 ? null : this.state.OpenChat[0].sellerName}</h2>
                            </div>
                            <Icon type="menu" style={{color:"white",fontSize:25}}  onClick={()=>this.setState({isContactList:true})} />
                        </div>

                            {/*List of Chats*/}
                        <div className="exclusive-messeges-body-list">
                            <div className="list-header">
                                <h2 style={{margin:0,color:'white'}}>Chats</h2>
                            </div>
                            <div className="list-body" >
                                {
                                    this.state.searchedChats.length !== 0 ?

                                        this.state.searchedChats.map(chat=>{
                                            var isRead = true;
                                            chat.messeges.map(message=>{
                                                if(message.isRead === false && message.senderID !== 'buy111')
                                                {
                                                    isRead=false
                                                }
                                            })
                                            return(
                                                
                                                <div  className="chat" onClick={()=>this.handleReadMesseges(chat._id)}>
                                                    {
                                                        isRead === false ? <Badge dot><Avatar size={50} src={chat.sellerProfilePic} /></Badge> : <Avatar size={50} src={chat.sellerProfilePic} />
                                                    }
                                                    <div style={{padding:'5px'}}>
                                                        <Truncate lines="1"  style={{margin:0,color:'#8b0000',fontWeight:'bold'}}>
                                                            {chat.sellerName}
                                                        </Truncate>
                                                        <p style={{margin:0,color:'gray'}}>Click to see messeges</p>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    :
                                        this.state.myChats.map(chat=>{
                                            var isRead = true;
                                            chat.messeges.map(message=>{
                                                if(message.isRead === false && message.senderID !== 'buy111')
                                                {
                                                    isRead=false
                                                }
                                            })
                                            return(
                                                
                                                <div  className="chat" onClick={()=>this.handleReadMesseges(chat._id)}>
                                                    {
                                                        isRead === false ? <Badge dot><Avatar size={50} src={chat.sellerProfilePic} /></Badge> : <Avatar size={50} src={chat.sellerProfilePic} />
                                                    }
                                                    <div style={{padding:'5px'}}>
                                                        <Truncate lines="1"  style={{margin:0,color:'#8b0000',fontWeight:'bold'}}>
                                                            {chat.sellerName}
                                                        </Truncate>
                                                        <p style={{margin:0,color:'gray'}}>Click to see messeges</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className="list-footer">
                                <Search className="footer-search" placeholder="search by name" onChange={this.handleSearch} size="large" />
                            </div>
                        </div>
                        
                         
                    {   
                    
                    this.state.OpenChat.length === 0 ?

                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'70%'}}>
                            <h1 style={{margin:0,color:'lightgray'}}>Click chat to see messeges</h1>
                        </div> 

                        :
                        
                        <div className="exclusive-messeges-body-chat">
                            <div className="chat-header">
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <Avatar size={45} src={this.state.OpenChat[0].sellerProfilePic}  />
                                    <h2 style={{margin:0,color:'white',marginLeft:'10px'}}>{this.state.OpenChat[0].sellerName}</h2>
                                </div>
                            </div>
                            <div className="chat-body">
                                <>
                                {
                                    this.state.Messeges.map((message,i)=>{
                                        if(message.senderID==='buy111')
                                        {
                                            if(message.Text !== '')
                                            {
                                                return(
                                                        <div className="chat-body-user1">
                                                            <div className="first-user-message">
                                                                <div className="avatar">
                                                                    <Avatar size={50} src={message.senderAvatarLink} />
                                                                </div>
                                                                
                                                                <div className="msg">
                                                                    <p style={{margin:0,padding:5,backgroundColor:'#8b0000',color:'white'}}>
                                                                        {message.Text}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }

                                            else if(message.File !== '')
                                            {
                                                return(
                                                        <div className="chat-body-user1">
                                                            <div className="first-user-message">
                                                                <div className="avatar">
                                                                    <Avatar size={50} src={message.senderAvatarLink} />
                                                                </div>
                                                                
                                                                <div className="msg">
                                                                    <a href={message.File} download style={{margin:0,padding:5,backgroundColor:'#8b0000',color:'white',display:'flex',alignItems:'center'}}>
                                                                        File 
                                                                        <h4 className="View" style={{margin:0,marginLeft:15,color:'white'}}>
                                                                            <Icon style={{margin:0}} type="download" />
                                                                        </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }

                                            else if(message.Proposal.Price !==0 && message.Proposal.Shipping !== '' && message.Proposal.proposalDetail !== '')
                                            {
                                                return(
                                                        <div className="chat-body-user1">
                                                            <div className="first-user-message">
                                                                    <div className="avatar">
                                                                        <Avatar size={50} src={message.senderAvatarLink} />
                                                                    </div>
                                                                    
                                                                    <div className="msg">
                                                                        <p style={{margin:0,padding:5,backgroundColor:'#8b0000',color:'white',display:'flex',alignItems:'center'}}>
                                                                            Propsal 
                                                                            <h4 className="View" style={{margin:0,marginLeft:15,color:'white'}} onClick={()=>this.handleViewProposal(i)}>
                                                                                View 
                                                                                <Icon style={{margin:0}} type="caret-down" />
                                                                            </h4>
                                                                        </p>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                            else
                                            {
                                                return(
                                                        <div className="chat-body-user1">
                                                            <div className="first-user-message">
                                                                    <div className="avatar">
                                                                        <Avatar size={50} src={message.senderAvatarLink} />
                                                                    </div>
                                                                    
                                                                    <div className="msg">
                                                                        <img src={message.Image} style={{width:150,height:150}} onClick={()=>this.viewImage(message.Image)} />
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        }
                                        else
                                        {

                                            {/*User 2*/}
                                            if(message.Text !== '')
                                            {
                                                return(
                                                        <div className="chat-body-user2">
                                                            <div className="second-user-message">
                                                                <div className="msg">
                                                                    <p style={{margin:0,padding:5,backgroundColor:'#eeeeee',fontWeight:'bold'}}>
                                                                        {message.Text}
                                                                    </p>
                                                                </div>
                                                                <div className="avatar">
                                                                    <Avatar size={50} src={message.senderAvatarLink} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }

                                            
                                            else if(message.File !== '')
                                            {
                                                return(
                                                    <div className="chat-body-user2">
                                                        <div className="second-user-message">
                                                                <div className="msg">
                                                                    <a href={message.File} download style={{padding:5,margin:0,fontWeight:'bold',backgroundColor:'#eeeeee',display:'flex',alignItems:'center',color:'black'}}>
                                                                        File
                                                                        <h4 className="View" style={{margin:0,marginLeft:15}}>
                                                                            <Icon type="download" /></h4>
                                                                    </a>
                                                                </div>
                                                                <div className="avatar">
                                                                    <Avatar size={50} src={message.senderAvatarLink} />
                                                                </div>
                                                        </div>
                                                    </div>
                                                    )
                                            }

                                            else if(message.Proposal.Price !==0 && message.Proposal.Shipping !== '' && message.Proposal.proposalDetail !== '')
                                            {
                                                return(
                                                        <div className="chat-body-user2">
                                                            <div className="second-user-message">
                                                                    <div className="msg">
                                                                        <p style={{padding:5,margin:0,fontWeight:'bold',backgroundColor:'#eeeeee',display:'flex',alignItems:'center'}}>
                                                                            Propsal 
                                                                            <h4 className="View" style={{margin:0,marginLeft:15}} onClick={()=>this.handleViewProposal(message.Proposal)}>
                                                                                View <Icon type="caret-down" /></h4></p>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <Avatar size={50} src={message.senderAvatarLink} />
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                            else
                                            {
                                                return(
                                                        <div className="chat-body-user2">
                                                            <div className="second-user-message">
                                                                    <div className="msg">
                                                                        <img src={message.Image} style={{width:150,height:150}} onClick={()=>this.viewImage(message.Image)} />
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <Avatar size={50} src={message.senderAvatarLink} />
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        }
                                    })
                                }
                                </>                            

                                {/* View Proposal Modal */}
                                <Modal visible={this.state.isViewProposal} onCancel={()=>this.setState({isViewProposal:!this.state.isViewProposal})} title="Propsal" footer={null}>
                                        <div>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',marginBottom:'20px'}}>
                                                <h4 style={{margin:0}}>Price</h4>
                                                <p style={{margin:0}}>{this.state.viewProposalPrice}</p>
                                            </div>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',marginBottom:'20px'}}>
                                                <h4 style={{margin:0}}>Shipping</h4>
                                                <p style={{margin:0}}>{this.state.viewProposalDays}</p>
                                            </div>
                                            <div style={{marginBottom:'20px'}}>
                                                <h4 style={{margin:0}}>Proposal</h4>
                                                <p style={{margin:0}}>{this.state.viewProposalDetail}</p>
                                            </div>   
                                            <Divider></Divider>
                                            <Input.TextArea rows="5" placeholder="Describe your Oreder...." value={this.state.orderDetail} onChange={(e)=>this.setState({orderDetail:e.target.value})}>

                                            </Input.TextArea>
                                            <Button style={{backgroundColor:'#B17E4E',color:'white',marginTop:20}} onClick={this.handleAcceptProposal} >Accept Proposal</Button>   
                                        </div>
                                </Modal>

                                {/* View Image Modal */}
                                <Modal visible={this.state.isViewImage} bodyStyle={{padding:0}} onCancel={()=>this.setState({isViewImage:!this.state.isViewImage})} footer={null} closable={false}>
                                    <img src={this.state.viewImage} style={{width:520,height:520}} />
                                </Modal>
                            </div>
                            <div className="chat-footer">
                                <div className="footer-input-box" >
                                    <Input placeholder="Type Messege here" value={this.state.Text} onChange={(e)=>this.setState({Text:e.target.value})} size="large" className="send-message-box" />
                                    <Button size="large" style={{width:'20%',backgroundColor:'#B17E4E',color:'white'}} onClick={this.handleSendTextMessege}>Send</Button>
                                </div>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <Upload onChange={this.chatImage} showUploadList={false}><Icon className="View" type="picture"  style={{fontSize:'35px',color:'lightgray',marginRight:15}} /> </Upload>
                                    <Upload onChange={this.handleSendFile} showUploadList={false}><Icon className="View" type="paper-clip" style={{fontSize:'35px',color:'lightgray'}} /> </Upload>
                                </div>
                            </div>          
                        </div>
                    }
                    <Drawer placement="right" closable={false} onClose={()=>this.setState({isContactList:!this.state.isContactList})} visible={this.state.isContactList}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                        bodyStyle={{padding:0}}
                    >
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style={{height: '10vh',backgroundColor:'#B17E4E',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <h2 style={{margin:0,color:'white'}}>Chats</h2>
                            </div>
                            <div style={{ height: '66vh',overflowY: 'auto',overflowX: 'hidden'}}>
                                {

                                    this.state.searchedChats.length !== 0 ?

                                        this.state.searchedChats.map(chat=>{
                                            var isRead = true;
                                            chat.messeges.map(message=>{
                                                if(message.isRead === false && message.senderID !== 'buy111')
                                                {
                                                    isRead=false
                                                }
                                            })
                                            return(
                                                
                                                    <div  style={{display: 'flex',alignItems: 'center',padding: 5,borderBottom: 'solid 1px #c9c7c7'}} onClick={()=>this.handleReadMesseges(chat._id)}>
                                                        {
                                                            isRead === false ? <Badge dot><Avatar size={50} src={chat.sellerProfilePic} /></Badge> : <Avatar size={50} src={chat.sellerProfilePic} />
                                                        }
                                                        <div style={{padding:'5px'}}>
                                                            <Truncate lines="1"  style={{margin:0,color:'#8b0000',fontWeight:'bold'}}>
                                                                {chat.sellerName}
                                                            </Truncate>
                                                            <p style={{margin:0,color:'gray'}}>Click to see messeges</p>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    
                                    :

                                        this.state.myChats.map(chat=>{
                                            var isRead = true;
                                            chat.messeges.map(message=>{
                                                if(message.isRead === false && message.senderID !== 'buy111')
                                                {
                                                    isRead=false
                                                }
                                            })
                                            return(
                                                
                                                    <div  style={{display: 'flex',alignItems: 'center',padding: 5,borderBottom: 'solid 1px #c9c7c7'}} onClick={()=>this.handleReadMesseges(chat._id)}>
                                                        {
                                                            isRead === false ? <Badge dot><Avatar size={50} src={chat.sellerProfilePic} /></Badge> : <Avatar size={50} src={chat.sellerProfilePic} />
                                                        }
                                                        <div style={{padding:'5px'}}>
                                                            <Truncate lines="1"  style={{margin:0,color:'#8b0000',fontWeight:'bold'}}>
                                                                {chat.sellerName}
                                                            </Truncate>
                                                            <p style={{margin:0,color:'gray'}}>Click to see messeges</p>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                }   
                            </div>
                            <div style={{height: '8vh',borderTop: 'solid 1px lightgray',display: 'flex',justifyContent: 'center',alignItems: 'center',padding:5}}>
                                <Search style={{border: 'solid 1px gray',width: '100%' }} placeholder="search by name" onChange={this.handleSearch} size="large" />
                            </div>
                        </div>
                    </Drawer>

                    </div>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps=(dispatch)=>{
    return{
        createOrder:(orderData)=>{dispatch(CreateExclusiveOrder(orderData))}
    }
}


export default connect(null,mapDispatchToProps)(ExclusiveMesseges);
