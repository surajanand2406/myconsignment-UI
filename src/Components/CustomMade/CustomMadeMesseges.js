import React, { Component } from 'react'
import ClientSocket from 'socket.io-client'
import {url} from '../../Constants'
import firebase from 'firebase'
import CustomMadeNavbar from './CustomMadeNavbar'
import {Input,Button,Avatar,Modal,Form,DatePicker,Drawer} from 'antd'
import { Icon } from '@ant-design/compatible';
import './CSS/CustomMadeMesseges.css'
import {ReadChats,ReadMessege} from '../../store/actions/ChatActions'
import {CreateOrder} from '../../store/actions/OrderActions'
import { connect } from 'react-redux'


const socket = ClientSocket(url);

const width = window.innerWidth;
class CustomMadeMesseges extends Component {


    constructor(props){
        super(props);

        this.state={

            windowWidth:width,
            visible:false,
            newList:[],
            chatData:[],

            isMakeProposal:false,
            isViewProposal:false,
            isViewImage:false,
    
            inputValue:'',
            Image:'',
            Price:"",
            Shipping:"",
            proposalDetail:"",
            jobId:'',
        
            senderAvatarLink:'',

            messages:[],
            readMesseges:[],
            proposalPrice:'',
            proposalShipping:'',
            proposalDetailValue:'',
            imagePath:'',
            endDate:'',
            

            userData:{}


        }
        
        socket.on('new-Messege',(data)=>{
            this.setState({messages:this.state.messages.concat(data)})
            this.props.readChats();
        })
        
    }
    

    componentDidMount(){

        const data = localStorage.getItem('userData')
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }



        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.innerWidth});
        })  

        this.props.readChats();
    }

    handleSendMessege=()=>{

        const data ={
            messages:{
                    Text:this.state.inputValue,
                    Image:this.state.Image,
                    Proposal:{
                        Price:this.state.Price,
                        Shipping:this.state.Shipping,
                        proposalDetail:this.state.proposalDetail,
                        jobId:this.state.readMesseges[0].messages[0].Proposal.jobId
                    },
                    senderAvatarLink:this.state.senderAvatarLink,
                    senderID:this.state.userData.firebaseUID,
                },
            ChatID:this.state.readMesseges[0]._id
        }

        this.setState({inputValue:''})

        socket.emit('new-messege',data)
    }


    openMakeProposalModal=()=>{
        this.setState({isMakeProposal:true})
    }

    closeMakeProposalModal=()=>{
        this.setState({isMakeProposal:false})
    }

    openViewImageModal=(path)=>{
        this.setState({imagePath:path,isViewImage:true})    
    }

    closeViewImageModal=()=>{
        this.setState({isViewImage:false})
    }

    openViewProposalModal=(i)=>{

        var data = this.state.readMesseges[0].messages;


        data.map((proposal,index)=>{
            if(index===i)
            {
                this.setState({
                    proposalPrice:proposal.Proposal.Price,
                    proposalShipping:proposal.Proposal.Shipping,
                    proposalDetailValue:proposal.Proposal.proposalDetail,
                    isViewProposal:true
                })
            }
        })
    }

    searchChat=(e)=>{
        let updatedList = [];
        
        if(e.target.value.trim() !=="")
        {

                updatedList = this.state.chatData.filter(data=>{
                    const item = data.buyerName.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({newList:updatedList})
        }
        else
        {
            updatedList= this.props.newChat;
            this.setState({newList:updatedList}) 
        }
    }

    closeViewProposalModal=()=>{
        this.setState({isViewProposal:false})
    }

    handleAcceptProposal=()=>{

        var date = new Date();

        var data={
            SellerName:this.state.readMesseges[0].messages[0].senderName, 
            SellerID:this.state.readMesseges[0].messages[0].senderID,
            BuyerName:this.state.userData.fName,
            BuyerID:this.state.userData.firebaseUID,
            JobID:this.state.readMesseges[0].messages[0].Proposal.jobId,
            StartDate:date.toLocaleDateString(),
            EndDate:this.state.endDate,
            Amount:this.state.proposalPrice,
            isComplete:false,
        }


        this.setState({isViewProposal:false})

        this.props.createOrder(data)


    }

    chatImage=(e)=>{

            var storageRef = firebase.storage().ref();
                    var mountainImagesRef = storageRef.child(`chatImages/${e.target.files[0].name}`);
            
                    mountainImagesRef.put(e.target.files[0]).then(()=> {
                        mountainImagesRef.getDownloadURL().then((url)=>{
                            const data ={
                                messages:{
                                        Text:this.state.inputValue,
                                        Image:url,
                                        Proposal:{
                                            Price:this.state.Price,
                                            Shipping:this.state.Shipping,
                                            proposalDetail:this.state.proposalDetail,
                                            jobId:this.state.readMesseges[0].messages[0].jobId
                                        },
                                        senderAvatarLink:this.state.senderAvatarLink,
                                        senderID:this.state.userData.firebaseUID,
                                    },
                                ChatID:this.state.readMesseges[0]._id
                            }

                            socket.emit('new-messege',data);
                              
                        })
                    })   
    }


    handleOpenChat=(Id)=>{
        var newMess = this.props.newChat.filter(data=>{
            if(data._id===Id)
            {
                return data
            }
        })
        this.setState({readMesseges:newMess,messages:newMess[0].messages,visible:false})
        this.props.readMessege({Id})
    }

    handleSendProposal=()=>{

        const data ={
            messages:{
                    Text:this.state.inputValue,
                    Image:this.state.Image,
                    Proposal:{
                        Price:this.state.Price,
                        Shipping:this.state.Shipping,
                        proposalDetail:this.state.proposalDetail,
                        jobId:this.state.readMesseges[0].messages[0].Proposal.jobId
                    },
                    senderAvatarLink:this.state.userData.profilePic,
                    senderID:this.state.userData.firebaseUID,
                },
            ChatID:this.state.readMesseges[0]._id
        }

        this.setState({isMakeProposal:false})

        socket.emit('new-messege',data);
    }



    render() {

        this.state.chatData = this.props.newChat.filter(data=>{

            if(data.buyerID === this.state.userData.firebaseUID || data.sellerID === this.state.userData.firebaseUID)
            {
                return data
            }
        })


        const {Search} = Input;
        return (
            <div className="messeges-container">
                <CustomMadeNavbar />
                
                <div className="messeges-body-container">
                    <div className="messeges-body">

                            {/*Chat Header For small devicessssss*/}
                            <div className="chat-header-for-smalldevice">
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <Avatar size={40} style={{marginLeft:'10px'}} />
                                    <h2 style={{margin:0,color:'white',marginLeft:'10px'}}>{this.state.readMesseges.length === 0 ? null : this.state.readMesseges[0].sellerName}</h2>
                                </div>
                                <div className="list-icon">
                                    <Icon type="menu" style={{fontSize:'20px',color:'white'}} onClick={()=>this.setState({visible:true})} />
                                </div>
                            </div>


                        <div className="messeges-body-list">
                            <div className="list-header">
                                <h2 style={{color:'white'}}>Chat</h2>
                            </div>
                            <div className="chats">
                                {

                                    this.state.newList.length !== 0 ?

                                    this.state.newList.reverse().map(data=>{

                                        if(data.isRead===false)
                                        {
                                            return(

                                                <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                    <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                    <div style={{padding:'5px'}}>
                                                      
                                                        <h3 style={{margin:0,color:'darkcyan',display:'flex',alignItems:'center'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}<p style={{fontSize:'1px',marginLeft:'5px',border:'solid 3px red',borderRadius:'50px'}}>.</p></h3>
                                                        <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                    </div>
                                                </div>
    
                                            )

                                        }
                                        else
                                        {
                                            return(

                                                <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                    <Avatar size={55} src={ data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                    <div style={{padding:'5px'}}>
                                                        <h3 style={{margin:0,color:'darkcyan'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}</h3>
                                                        <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                    </div>
                                                </div>

                                            )
                                        }
                                    })

                                    :

                                    this.state.chatData.reverse().map(data=>{

                                        if(data.sellerID!==this.state.userData.firebaseUID && data.isRead===false)
                                        {
                                            return(

                                                <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                    <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                    <div style={{padding:'5px'}}>
                                                      
                                                        <h3 style={{margin:0,color:'darkcyan',display:'flex',alignItems:'center'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}<p style={{fontSize:'1px',marginLeft:'5px',border:'solid 3px red',borderRadius:'50px'}}>.</p></h3>
                                                        <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                    </div>
                                                </div>
    
                                            )

                                        }
                                        else
                                        {
                                            return(

                                                <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                    <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                    <div style={{padding:'5px'}}>
                                                        <h3 style={{margin:0,color:'darkcyan'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}</h3>
                                                        <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                    </div>
                                                </div>

                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="list-footer">
                                <Search
                                    placeholder="search by name"
                                    onChange={this.searchChat}
                                    style={{ width: 350,border:'solid 1px gray',borderRadius:'5px' }}
                                    size="large"
                                />
                            </div>
                        </div>
                        {

                            this.state.readMesseges.length === 0 ? 
                            
                            <div style={{width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <h1 style={{color:"lightgray",fontSize:'30px'}}>Click Chat to See Messages</h1>
                            </div>
                            
                            :

                            <div className="messeges-body-chat">
                                <div className="chat-header">
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <Avatar src={this.state.readMesseges[0].sellerID === this.state.userData.firebaseUID ? this.state.readMesseges[0].buyerProfilePic : this.state.readMesseges[0].sellerProfilePic} size={40} style={{marginLeft:'10px'}} />
                                        <h2 style={{margin:0,color:'white',marginLeft:'10px'}}>{this.state.readMesseges[0].sellerID === this.state.userData.firebaseUID ? this.state.readMesseges[0].buyerName : this.state.readMesseges[0].sellerName}</h2>
                                    </div>
                                    <div className="list-icon">
                                        <Icon type="menu" style={{fontSize:'20px',color:'white'}} onClick={()=>this.setState({visible:true})} />
                                    </div>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-body-messeges"> 
                                            {
                                        
                                                this.state.messages.map((msg,i)=>{

                                                    if(msg.senderID===this.state.userData.firebaseUID)
                                                    {

                                                        if(msg.Text !== '')
                                                        {
                                                            return(

                                                                <div style={{display:'flex',width:'100%',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                    <div style={{width:'90%',marginRight:'5px',display:"flex",justifyContent:"flex-end"}}>
                                                                        <p style={{padding:'10px',margin:0,color:'gray',backgroundColor:'#eeeeee',borderRadius:'5px'}}>{msg.Text}</p>
                                                                    </div>
                                                                    <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                        <Avatar src={this.state.userData.profilePic} size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                    </div>
                                                                </div> 

                                                            )
                                                        }
                                                        else if(msg.Proposal.Price !=='' && msg.Proposal.Shipping !== '' && msg.Proposal.proposalDetail !== '')
                                                        {
                                                            return(

                                                                <div style={{display:'flex',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                    <div style={{width:'90%',marginRight:'5px',display:'flex',justifyContent:'flex-end'}}>
                                                                        <p style={{padding:'10px',margin:0,backgroundColor:'#eeeeee',borderRadius:'5px',display:'flex',alignItems:'center'}}>Proposal <h4 className="View" style={{margin:0,marginLeft:'10px'}} onClick={()=>this.openViewProposalModal(i)}>View <Icon type="caret-down" /></h4></p>
                                                                    </div>
                                                                    <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                        <Avatar src={this.state.userData.profilePic} size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                    </div>
                                                                </div>

                                                            )
                                                        }
                                                        else if(msg.Image !== '')
                                                        {
                                                            return(

                                                                <div style={{display:'flex',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                    <div style={{width:'90%',marginRight:'5px',display:'flex',justifyContent:'flex-end'}}>
                                                                        <img src={msg.Image} style={{width:150,height:150}} onClick={()=>this.openViewImageModal(msg.Image)} />
                                                                    </div>
                                                                    <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                        <Avatar src={this.state.userData.profilePic} size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                    </div>
                                                                </div>

                                                            )
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if(msg.Text !== '')
                                                        {
                                                            return(
                                                                        <div style={{display:'flex',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                                <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                                        <Avatar src={ this.state.readMesseges[0].sellerID === this.state.userData.firebaseUID ? this.state.readMesseges[0].buyerProfilePic : this.state.readMesseges[0].sellerProfilePic} size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                                </div>
                                                                                <div style={{width:'90%',marginLeft:'0px',display:"flex",justifyContent:"flex-start"}}>
                                                                                    <p style={{padding:'10px',margin:0,color:'white',backgroundColor:'darkcyan',borderRadius:'5px'}}>{msg.Text}</p>
                                                                                </div>
                                                                        </div>

                                                                )
                                                            }
                                                            else if(msg.Proposal.Price !=='' && msg.Proposal.Shipping !== '' && msg.Proposal.proposalDetail !== '')
                                                            {
                                                                return(

                                                                        <div style={{display:'flex',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                                <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                                    <Avatar src={this.state.readMesseges[0].sellerID === this.state.userData.firebaseUID ? this.state.readMesseges[0].buyerProfilePic : this.state.readMesseges[0].sellerProfilePic}  size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                                </div>
                                                                                <div style={{width:'90%',display:"flex"}}>
                                                                                    <p style={{padding:'10px',margin:0,color:'white',backgroundColor:'darkcyan',borderRadius:'5px',display:'flex',alignItems:'center'}}>Propsal <h4 className="View" style={{margin:0,marginLeft:'10px',color:'white'}} onClick={()=>this.openViewProposalModal(i)}>View <Icon type="caret-down" /></h4></p>
                                                                                </div>   
                                                                        </div>
                                                                )
                                                            }
                                                            else if(msg.Image !== '')
                                                            {
                                                                return(
        
                                                                        <div style={{display:'flex',alignItems:'flex-start',marginBottom:'10px'}}>
                                                                                <div style={{width:'10%',display:'flex',justifyContent:'center'}}>
                                                                                    <Avatar src={this.state.readMesseges[0].sellerProfilePic} size={this.state.windowWidth < 678 ? 45 : 55} />
                                                                                </div>
                                                                                <div style={{width:'90%',marginLeft:'5px',display:"flex",justifyContent:"flex-start"}}>
                                                                                    <img src={msg.Image} style={{width:150,height:150}} onClick={this.openViewImageModal} />
                                                                                </div>      
                                                                        </div>

                                                                )
                                                            }
                                                            
                                                    }
                                                        
                                                })
   
                                                
                                            }
                                    </div> 

                                    <Modal visible={this.state.isViewProposal} onCancel={this.closeViewProposalModal} title="Propsal" footer={null}>
                                        <div> 
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',marginBottom:'20px'}}>
                                                <h4 style={{margin:0,fontWeight:'bold'}}>Price</h4>
                                                <p style={{margin:0}}>${this.state.proposalPrice}</p>
                                            </div>
                                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',marginBottom:'20px'}}>
                                                <h4 style={{margin:0,fontWeight:'bold'}}>Shipping</h4>
                                                <p style={{margin:0}}>{this.state.proposalShipping}</p>
                                            </div>
                                            <div style={{marginBottom:'20px'}}>
                                                <h4 style={{margin:0,fontWeight:'bold'}}>Proposal</h4>
                                                <p style={{margin:0}}>{this.state.proposalDetailValue}</p>
                                            </div>   
                                            <hr />
                                            <div>
                                                <h4 style={this.state.readMesseges[0].sellerID=== this.state.userData.firebaseUID ? {display:'none'}:{display:'block'}}>Select End Date</h4>
                                                <input type="date" onChange={(val)=>{this.setState({endDate:val.target.value})}} style={this.state.readMesseges[0].sellerID=== this.state.userData.firebaseUID ? {display:'none'}:{width:'100%',marginBottom:'20px'}} />
                                                <Button style={this.state.readMesseges[0].sellerID=== this.state.userData.firebaseUID ? {display:'none'}:{backgroundColor:'#B17E4E',color:'white'}} onClick={this.handleAcceptProposal}>Accept Proposal</Button>   
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal visible={this.state.isViewImage} bodyStyle={{padding:0}} onCancel={this.closeViewImageModal} title="Image" footer={null}>

                                        <img  src={this.state.imagePath} style={{width:520,height:520}} />

                                    </Modal>
                                </div>
                                <div className="chat-footer">
                                    <Input placeholder="Type Messege here" enterButton="Send" size="large" style={{width:this.state.windowWidth<678 ? '100%' : '60%',marginRight:'15px',border:'solid 1px gray'}} value={this.state.inputValue} onChange={(e)=>{this.setState({inputValue:e.target.value})}} />
                                    <div className="chat-footer-btns">
                                        <div style={{display:'flex',alignItems:'center'}}>
                                            <div>
                                                <input type="file" id="file" style={{display:'none'}}  />
                                                <label for="file" style={{color:'gray'}}><Icon type="upload" onChange={this.chatImage}  /> Image</label>
                                            </div>
                                            <Button style={this.state.readMesseges[0].buyerID=== this.state.userData.firebaseUID ? {display:'none'}:{color:'white',marginLeft:'5px',backgroundColor:'#B17E4E'}} size="default" onClick={this.openMakeProposalModal}>Make Propsal</Button>
                                        </div>
                                        <div className="View" style={{display:'flex',justifyContent:'center',alignItems:'center'}} onClick={this.handleSendMessege}>
                                            <h3 style={{fontSize:'20px',margin:0,color:'#8b0000'}}>Send</h3>
                                            <Icon type="caret-right" style={{fontSize:'22px',color:'#8b0000'}} />
                                        </div>
                                    </div>


                                    <Modal visible={this.state.isMakeProposal} title="Make Proposal" onCancel={this.closeMakeProposalModal} footer={null}>
                                            <Form>
                                                <div>
                                                    <h4>Your Price</h4>
                                                    <Input style={{marginBottom:'20px'}} onChange={(e)=>{this.setState({Price:e.target.value})}} placeholder="Enter Price...." value={this.state.Price} size="large" />
                                                </div>
                                                <div>
                                                    <h4>Shipping</h4>
                                                    <Input style={{marginBottom:'20px'}} onChange={(e)=>{this.setState({Shipping:e.target.value})}} placeholder="Shipping...." value={this.state.Shipping} size="large" />
                                                </div>
                                                <div>
                                                    <h4>Your Proposal</h4>
                                                    <Input.TextArea style={{marginBottom:'20px'}} onChange={(e)=>{this.setState({proposalDetail:e.target.value})}} value={this.state.proposalDetail} rows="6">
                                                    </Input.TextArea>
                                                </div>
                                                <Button style={{backgroundColor:'#B17E4E',color:'white'}} onClick={this.handleSendProposal}>Send Proposal</Button>
                                            </Form>
                                    </Modal>
                                </div>
                            </div>
                        }
                        
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                            getContainer={false}
                            style={{ position: 'absolute'}}
                            bodyStyle={{padding:0}}
                            width="80%"
                        >
                                <div style={{display:"flex",flexDirection:'column',width:'100%',height:'81vh'}}>
                                    <div style={{height:'10vh',backgroundColor:'#B17E4E',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px'}}>
                                        <h2 style={{color:'white',margin:0}}>Chat</h2>
                                        <Icon type="close" style={{fontSize:'20px',color:'white'}} onClick={()=>this.setState({visible:false})}/>
                                    </div>
                                    <div style={{height:'82vh',padding:'5px',overFlowY:'auto',overFlowX:'hidden'}}>
                                        {
                                            this.state.newList.length !== 0 ?

                                            this.state.newList.reverse().map(data=>{

                                                if(data.isRead===false)
                                                {
                                                    return(

                                                        <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                            <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                            <div style={{padding:'5px'}}>
                                                            
                                                                <h3 style={{margin:0,color:'#8b0000',display:'flex',alignItems:'center'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}<p style={{fontSize:'1px',marginLeft:'5px',border:'solid 3px red',borderRadius:'50px'}}>.</p></h3>
                                                                <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                            </div>
                                                        </div>

                                                    )

                                                }
                                                else
                                                {
                                                    return(

                                                        <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                            <Avatar size={55} src={ data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                            <div style={{padding:'5px'}}>
                                                                <h3 style={{margin:0,color:'#8b0000'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}</h3>
                                                                <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                            })

                                            :

                                            this.state.chatData.reverse().map(data=>{

                                                if(data.sellerID!==this.state.userData.firebaseUID && data.isRead===false)
                                                {
                                                    return(

                                                        <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                            <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                            <div style={{padding:'5px'}}>
                                                            
                                                                <h3 style={{margin:0,color:'#8b0000',display:'flex',alignItems:'center'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}<p style={{fontSize:'1px',marginLeft:'5px',border:'solid 3px red',borderRadius:'50px'}}>.</p></h3>
                                                                <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                            </div>
                                                        </div>

                                                    )

                                                }
                                                else
                                                {
                                                    return(

                                                        <div style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:"solid 1px #c9c7c7"}} onClick={()=>{this.handleOpenChat(data._id)}} >
                                                            <Avatar size={55} src={data.sellerID===this.state.userData.firebaseUID ? data.buyerProfilePic : data.sellerProfilePic} />
                                                            <div style={{padding:'5px'}}>
                                                                <h3 style={{margin:0,color:'#8b0000'}}>{data.sellerID===this.state.userData.firebaseUID ? data.buyerName : data.sellerName}</h3>
                                                                <p style={{margin:0,color:'gray'}}>Hello, how are you?</p>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    <div style={{ height:'10vh',borderTop: 'solid 1px lightgray',display: 'flex',justifyContent: 'center',alignItems: 'center',padding:'5px',backgroundColor:'#eeeeee'}}>
                                        <Search
                                            placeholder="search by name"
                                            onSearch={value => console.log(value)}
                                            style={{ width: 350,border:'solid 1px gray',borderRadius:'5px' }}
                                            size="large"
                                        />
                                    </div>
                                </div>
                        </Drawer>
                        

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        newChat:state.ChatReducer.ChatData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readChats:()=>{dispatch(ReadChats())},
        createOrder:(data)=>{dispatch(CreateOrder(data))},
        readMessege:(Id)=>{dispatch(ReadMessege(Id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomMadeMesseges);