import React, { Component } from 'react'
import  "./chatStd.css"
import openSocket from 'socket.io-client';
import firebase from "firebase";
import {url} from "../Constants"
// import { Icon } from "antd";
import { Icon } from '@ant-design/compatible';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { setUIDAction } from "../store/actions/actions.js";
import Navbar from './Navbar'

class Chat extends Component {
  constructor(props){
    super(props)
    this.state={
      Chats:[],
      Message:[],
      teacherUserID:"",
      userType: true,
      message: "",
      ChatId:"",
      profilePic:"",
      url:"",
      imege: "",
      UserName:" Select Chat",
      chatData:[],
      selectedIndex:0,
      messages:[],
      userData:null
    }
    this.SendMessageImage= this.SendMessageImage.bind(this)
    this.imageuploader= this.imageuploader.bind(this)
    this.handleImageFiles= this.handleImageFiles.bind(this)
    this.getChats= this.getChats.bind(this)
    this.showMessages= this.showMessages.bind(this)
    this.handleChange= this.handleChange.bind(this)
    this.SendMessage= this.SendMessage.bind(this)
    this.socket = openSocket(url);


    this.socket.on('output',(data)=>{
      if(data.length>0 && this.state.messages.length===0){
        this.setState({
          messages:data
        })
      }
    })
    this.socket.on('newMessage',data=>{
     
      this.setState({messages: [...this.state.messages, data]});
    })
    this.socket.on('status',data=>{
      this.setState({status:data.message,message:''})
      setTimeout(()=>this.setState({status:''}),1000)
    })
      this.socket.on('Sent',(mesg)=>{
       
          let a= this.state.Message
          let b =JSON.parse(mesg)
          a.push(b)
          this.setState({
            Message: a
          })
          
      })

    
  }
  handleImageFiles(e) {
    if(this.state.Chats.length>=1){
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.files[0]
    }, () => {
      // this.imageuploader()
   
        this.imageuploader()
    });
  }
}

  imageuploader() {
    const { image } = this.state;
    let storage = firebase.storage()
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progresBar: progress });
      },
      error => {
        // Error function ...\
        swal({
          title: "Uploading Failed",
           icon: "warning",
          buttons: true,
          dangerMode: true,
        })
       
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ link: url },()=>{
              this.SendMessageImage()
            });
          })
      }
    )
  }
  showMessages(id, index){
   
    let a= this.state.Chats[index]
    this.setState({
      Message: this.state.Chats[index].messages,
      ChatId:id,
      UserName: a.studentFname
    },()=>{
      console.log(this.state.Message[this.state.Message.length-1])    })
     
  
  }
 async componentDidMount(){
    let user =  await localStorage.getItem('userData')
    if(user!==null){
      let userData = JSON.parse(user)
      this.setState({
        userData
      })
      this.props.setUID(userData.firebaseUID)
      this.getChats()
   }
  }
async  getChats(){
  let body={
    firebaseUID: this.state.userData.firebaseUID

  }
await fetch(url+"/api/getChats",
{
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
}).then(res => res.json())  
.then(data => {
    if(data.message==='Success'){
      console.log(data)
        if(data.data.length>0){
            this.setState({
                chatData:data.data,
                messages:data.data[this.state.selectedIndex].messages
            })
        }
    }else{
        swal({
            title:"Failed to fetch Chats",

  icon: "warning",

  dangerMode: true,
        })
    }
}).catch(err => swal({
  title: err,

  icon: "warning",

  dangerMode: true,
})
)


}
handleChange(e){
  this.setState({
    [e.target.name]: e.target.value
  });
}

SendMessageImage(){
  let user={
    image: this.state.link,
    senderID: this.state.StudentChatuid,
    chatId :this.state.ChatId

  }

  if(user){
    this.socket.emit('input',JSON.stringify(user))
  }

let a= this.state.Message
  a.push(user)

  this.setState({
    Message: a,
    message: ""
  })

}

SendMessage(e){
    e.preventDefault()
    // if(this.state.ChatId!=='' && this.state.message!==''){
    //   this.socket.emit('input', {
     
    // });
    // }
  //   if(this.state.Chats.length){
  //     if(this.state.message){
  //       let user={
  //      text: this.state.message,
  //      senderID: this.state.StudentChatuid,
  //      chatId :this.state.ChatId
 
  //    }
  //    if(user){
  //      this.socket.emit('input',JSON.stringify(user))
  //    }
  //  let a= this.state.Message
  //    a.push(user)
    
  //    this.setState({
  //      Message: a,
  //      message: ""
  //    })
 
  //    }
  //   }
    
    console.log(this.props.userData)
   
  }
  
  render() {
    return (
      <div >
        <Navbar/>
        <br/>
        <br/>
        <div className="container">
    <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
               
              </div>
              <div className="inbox_chat">
                {this.state.chatData.length>0 && this.state.chatData.map((chat,index)=>{
                    let date = new Date()
                    let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
                    let day = date.getDate()
                    let month = months[date.getMonth()]
                    let dateString = month+' '+day
                    if(this.state.selectedIndex===index){
                        return <div className='chat_list active_chat'>
                            <div className="chat_people">
                      <div className="chat_img"> <img src={chat.sellerProfilePic} alt="sunil"/>{dateString}</div>
                      <div className="chat_ib">
                        <h5>{chat.sellerFname} <span className="chat_date"></span></h5>
                        <p>{chat.messages.length>0?chat.messages[chat.messages.length-1].text:"Start a new conversation"}</p>
                      </div>
                    </div>
                        </div>
                    }
                    else return <div onClick={()=>{
                      this.setState({
                        selectedIndex:index,
                        messages:chat.messages
                      })
                      // console.log(index)
                      // console.log(chat.messages)
                    }} className="chat_list">
                    <div className="chat_people">
                      <div className="chat_img"> <img src={chat.sellerProfilePic} alt="sunil"/>{dateString}</div>
                      <div className="chat_ib">
                        <h5>{chat.sellerFname} <span className="chat_date"></span></h5>
                        <p>{chat.messages.length>0?chat.messages[chat.messages.length-1]:"Start a new conversation"}</p>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {this.state.messages.length>0 && this.state.messages.map((message)=>{
                    if(this.props.UID===message.senderID){
                        if(message.text){
                          return  <div className="outgoing_msg">
                          <div className="sent_msg">
                                <p>{message.text}</p>
                            <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                        </div>
                        }
                        else{
                          return  <div className="outgoing_msg">
                          <div className="sent_msg">
                              <img style={{width:300}} src={message.image} alt='unreachable'/>
                            <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                        </div>
                        }
                    }else{
                        if(message.text){
                          return <div className="incoming_msg">
                        <div className="incoming_msg_img"> <img src={message.senderAvatarLink} alt="sunil"/> </div>
                        <div className="received_msg">
                          <div className="received_withd_msg">
                                <p>{message.text}</p>
                            <span className="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                      </div>
                        }
                        else{
                          return <div className="incoming_msg">
                          <div className="incoming_msg_img"> <img src={message.senderAvatarLink} alt="sunil"/> </div>
                          <div className="received_msg">
                            <div className="received_withd_msg">
                              <img style={{width:300}} src={message.image} alt='unreachable'/>
                              <span className="time_date"> 11:01 AM    |    June 9</span></div>
                          </div>
                        </div>
                        }
                    }
                })}
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input type="text" className="write_msg" placeholder="Type a message" />
                  <button onClick={this.SendMessage} className="msg_send_btn" type="button">
                  <Icon type="arrow-right" style={{ fontSize: '14px', color: 'white' }} onClick={() => { this.setState({ isSideBar: false }) }} />

                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
        </div>
        
        </div>
    )
  }
}

function mapStateToProps(state) {
    return ({
        categories:state.rootReducer.categories,
        UID:state.rootReducer.UID,
        query:state.rootReducer.query,
        userData:state.rootReducer.userInfo,
    })
}
function mapActionsToProps(dispatch) {
    return ({
        setUID:(uid)=>{
          dispatch(setUIDAction(uid))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(Chat)

 


