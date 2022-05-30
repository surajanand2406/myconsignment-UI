import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/CustomMadeNavbar.css'
import {Link} from 'react-router-dom'
import {Avatar, Drawer} from 'antd'
import { Icon } from '@ant-design/compatible';
import {ReadChats} from '../../store/actions/ChatActions'
import Artisan from '../footerImage.png'

class CustomMadeNavbar extends Component {

    state={
        isSideBar:false,
        userData:{}
    }

    componentDidMount(){
        window.scrollTo(0,0)
        const data = localStorage.getItem('userData')
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }

        this.props.readChats();
    }

    render() {
        const newChatData = this.props.newChat.filter(data=>{
            if(data.buyerID===this.state.userData.firebaseUID && data.isRead === false)
            {
                return data
            }
        })

        var length = newChatData.length;

        return (
            <div className="CustomMade-Container">
                <div className="CustomMade-Nav">
                    <div>
                    <img
                                    src={Artisan}
                                    alt='logo'
                                    width='150'
                                    className='exlusiveLogon'
                                    style={{width:150}}
                                    />
                    </div>
                    <div className="nav-menu">
                        <Icon type="menu" style={{fontSize:'25px',color:"white"}} onClick={()=>{this.setState({isSideBar:true})}} />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>

                    <Link className='custom-item' to="/custom-made-jobs" style={{marginRight:'15px',color:"white",fontSize:16}}>Jobs</Link>
                        <Link className='custom-item' to="/custom-made-post-job-select-category" style={{marginRight:'15px',color:'white',fontSize:16}}>Post a Job</Link>
                        <Link className='custom-item' to="/custom-made-my-jobs" style={{marginRight:'15px',color:'white',fontSize:16}}>My Jobs</Link>
                        <Link className='custom-item' to="/custom-made-messeges" style={{marginRight:'15px',color:'white',display:'flex',alignItems:'center',fontSize:16}}>
                            Messages <p style={{fontSize:'10px',marginLeft:'3px'}}>{length === 0 ? null : length}</p></Link>
                        <Link className='custom-item' to="/custom-made-profile" style={{marginRight:'15px',color:'white',fontSize:16}}>My Profile</Link>
                        <Link className='custom-item' to="/" style={{color:'white',fontSize:16}}>Return to Marketplace</Link>
                            {/* 
                        <Link to="/custom-made-profile" style={{display:'flex',alignItems:'center'}}>
                            <Avatar size={35} src={this.state.userData.profilePic} /> 
                            <h3 style={{color:'white',margin:0,marginLeft:'5px'}}>{this.state.userData.fName}</h3>
                        </Link>       */}
                    </div>
                </div>
                <div className="CustomMade-body-Container">
                </div>

                 {/*Side bar for small device*/}
                 <Drawer  visible={this.state.isSideBar} width="80%" closable={false} bodyStyle={{padding:0}} >
                        <div style={{height:'200px',backgroundColor:'#9b0000'}}>
                            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'10px'}}>
                                <Icon type="arrow-right" style={{fontSize:'30px',color:'white'}} onClick={()=>{this.setState({isSideBar:false})}} />
                            </div>
                            <div style={{display:'flex',alignItems:'center',padding:'10px'}}>
                                    <Avatar icon="user" size={80} />
        <h2 style={{color:'white',marginLeft:'20px'}}>{this.state.userData.fName!==undefined?this.state.userData.fName:"No Name"}</h2>
                            </div>
                        </div>
                        <div className="side-menu-link" style={{marginLeft:0}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Link to="/custom-made-jobs" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'15px',color:'black',borderBottom:'solid 1px lightgray'}}>Jobs Board</Link>
                                <Link to="/custom-made-post-job-select-category" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'15px',color:'black',borderBottom:'solid 1px lightgray'}}>Post a Job</Link>
                                <Link to="/custom-made-my-jobs" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'15px',color:'black',borderBottom:'solid 1px lightgray'}}>My Jobs</Link>
                                <Link to="/custom-made-messeges" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'15px',color:'black',borderBottom:'solid 1px lightgray',display:'flex',alignItems:'center'}}>
                                    Messeges <p style={{fontSize:'10px',marginLeft:'3px'}}>{length === 0 ? null : length}</p>
                                </Link>
                                <Link to="/" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'15px',color:'black',borderBottom:'solid 1px lightgray'}} >Return to MarketPlace</Link>
                            </div>

                        </div>
                </Drawer>



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
        readChats:()=>{dispatch(ReadChats())}
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(CustomMadeNavbar);
