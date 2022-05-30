import React, { Component } from 'react'
import './CSS/Chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faArrowLeft,faCommentDots,faCog,faAddressCard, faTimes} from '@fortawesome/free-solid-svg-icons'
import { Drawer, Avatar } from 'antd'

export default class extends Component {
    state={
        isContact:false
    }
    render() {
        const height = window.innerHeight;
        return (
            <div className="chat-container">

                <div className="chat-contact-area" >
                    <div style={{height:height*0.08,background:'#8b0000',display:'flex',alignItems:"center",justifyContent:'space-between'}}>
                            <FontAwesomeIcon icon={faArrowLeft} color="white" size='2x' style={{marginLeft:'10px'}} />
                            <h1 style={{color:'white',marginTop:'10px'}}>Contacts</h1>
                            <FontAwesomeIcon icon={faCog} size="2x" color="white" style={{marginRight:'10px'}}  />
                    </div>
                    <div className="chat-contact-body" style={{height:height*0.84}}>
                        <div className="chat-contact">
                            <div style={{width:'15%'}}>
                                <Avatar size={50} icon="user" />
                            </div>
                            <div style={{width:'85%',marginLeft:'10px',padding:'2px',backgroundColor:'#B17E4E',borderRadius:'10px'}}>
                                    <h3 style={{color:'white',margin:0,marginLeft:'10px'}}>Contacts</h3>
                                    <p style={{color:'white',margin:0,marginLeft:'10px'}}>hello</p>
                            </div>
                        </div>
                    </div>
                    <div style={{height:height*0.08,borderTop:'solid 1px gray'}}>
                        <div className="contact-search-box">
                            <FontAwesomeIcon icon={faSearch} color="gray" size="2x" style={{marginLeft:'20px'}} />
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                </div>
                <div className="chat-messege-area">
                    <div className="messeges-header" style={{height:height*0.08}}>
                        <div style={{width:'10%',display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <FontAwesomeIcon className="cog" icon={faCog} size="2x" />
                        </div>
                        <div style={{width:'80%',display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <h1 className="h1" style={{marginTop:'10px',color:'#8b0000'}}>Messeges</h1>
                        </div>
                        <div style={{width:'10%',display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <FontAwesomeIcon className="address-card" icon={faAddressCard} size='2x' onClick={()=>this.setState({isContact:true})} />
                        </div>
                    </div>
                    <div className="chat-messege-body" style={{height:height*0.84}}>
                        <div className="chat-messege">
                                <div className="user-2" style={{display:"flex",justifyContent:'flex-end',alignItems:'center'}}>
                                    <div style={{width:'95%',marginRight:'10px',padding:'2px',backgroundColor:'#B17E4E',borderRadius:'5px'}}>
                                            <p style={{color:'white',margin:0,marginLeft:'10px'}}>hello</p>
                                    </div>
                                    <div style={{width:'5%'}}>
                                        <Avatar size={50} icon="user" />
                                    </div>
                                </div>
                                <div className="user-1" style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                    <div style={{width:'5%'}}>
                                        <Avatar size={50} icon="user" />
                                    </div>
                                    <div style={{width:'95%',marginLeft:'10px',padding:'2px',backgroundColor:'#eeeeee',borderRadius:'5px'}}>
                                            <p style={{margin:0,marginLeft:'10px'}}>hello</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div style={{height:height*0.08,borderTop:'solid 1px gray'}}>
                        <div className="messege-send-box">
                            <FontAwesomeIcon icon={faCommentDots} color="gray" size="2x" style={{marginLeft:'20px'}} />
                            <input type="text" placeholder="Messege..." />
                        </div>     
                    </div>
                    <Drawer visible={this.state.isContact} bodyStyle={{padding:0}} closable={false} width='80%'>
                        <div className="chat-contact-area" >
                            <div style={{height:height*0.08,background:'#8b0000',display:'flex',alignItems:"center",justifyContent:'space-between'}}>
                                <h1 style={{color:'white',marginTop:'10px',marginLeft:'10px'}}>Contacts</h1>
                                <FontAwesomeIcon icon={faTimes} color="white" size="2x" style={{marginRight:'10px'}} onClick={()=>this.setState({isContact:false})} />
                            </div>
                            <div style={{height:height*0.84,display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <div style={{width:'90%',display:'flex',marginTop:'10px'}}>
                                    <div style={{width:'15%'}}>
                                        <Avatar size={50} icon="user" />
                                    </div>
                                    <div style={{width:'85%',marginLeft:'10px',padding:'2px',backgroundColor:'#B17E4E',borderRadius:'10px'}}>
                                        <h3 style={{color:'white',margin:0,marginLeft:'10px'}}>Contacts</h3>
                                        <p style={{color:'white',margin:0,marginLeft:'10px'}}>hello</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{height:height*0.08,borderTop:'solid 1px gray'}}>
                                <div className="contact-search-box">
                                    <FontAwesomeIcon icon={faSearch} color="gray" size="2x" style={{marginLeft:'20px'}} />
                                    <input type="text" placeholder="Search..." />
                                </div>
                            </div>
                        </div>
                    </Drawer>

                </div>

                
            </div>
        )
    }
}
